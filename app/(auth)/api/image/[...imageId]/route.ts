import { getImageDataByName } from "lib/actions/image-action";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  params: { params: { imageId: [string] } }
) {
  const fileName = params.params.imageId[0];
  try {
    const imageData = await getImageDataByName(fileName);

    if (imageData) {
      const headers = new Headers({
        "Content-Type": "image/png",
      });

      return new NextResponse(imageData, {
        status: 200,
        statusText: "OK",
        headers,
      });
    } else {
      console.log("Image not found or could not be retrieved.");
      return new Response("Image not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error retrieving image data:", error);
    return new Response("Error retrieving image data", { status: 500 });
  }
}
