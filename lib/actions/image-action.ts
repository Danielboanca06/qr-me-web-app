"use server";
import { getGridFS } from "lib/gridfs";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { Buffer } from "buffer";
import { url } from "lib/constants";

export const uploadImage = async (
  filename: string,
  image: string,
  userId: string
) => {
  const matches = image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image data");
  }
  try {
    const base64Data = matches[2];
    const optimizedImage = Buffer.from(base64Data, "base64");
    const gfs = await getGridFS();

    // Decode image data (assuming 'image' is a base64 string)

    // Create a readable stream from buffer
    const readableStream = new Readable();
    readableStream.push(optimizedImage);
    readableStream.push(null); // Signal the end of the stream

    // Upload to GridFS
    let name = userId + filename;
    name = name.replaceAll(" ", "");

    const uploadStream = gfs.openUploadStream(name, {
      metadata: {
        userId,
        name,
      },
    });

    // Pipe the readable stream to GridFS upload stream
    readableStream.pipe(uploadStream);

    // Wait for upload to finish
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    return {
      status: 200,
      success: true,
      message: "Image uploaded successfully",
      body: {
        filename: name,
        url: `${url}/api/image/${name}`,
      },
    };
  } catch (error) {
    console.error("Error processing file:", error);
    return {
      status: 500,
      success: false,
      message: "Error processing file",
    };
  }
};

export const getImageDataByName = async (
  filename: string
): Promise<Buffer | null> => {
  try {
    const gfs = await getGridFS();
    const file = await gfs.find({ filename }).toArray();

    if (file.length === 0) {
      throw new Error(`File not found with filename: ${filename}`);
    }

    const fileId = file[0]._id;
    const downloadStream = gfs.openDownloadStream(new ObjectId(fileId));

    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      downloadStream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      downloadStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      downloadStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return null;
  }
};

export const deleteImage = async (filename: string) => {
  try {
    const gfs = await getGridFS();
    const data = await gfs.find({ filename }).toArray();
    if (!data) {
      return {
        status: 404,
      };
    }
    await gfs.delete(data[0]?._id);
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
};
