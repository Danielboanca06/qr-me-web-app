"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CreateCard from "./createCard";
import { useCallback } from "react";
import { useBoardState } from "./boardStateContext";
import Image from "next/image";

const Container = () => {
  const { content, reorder } = useBoardState();

  const onDragEnd = useCallback((result: any) => {
    if (result.reason === "DROP" && result.destination) {
      reorder(result.source.index, result.destination.index);
    }
  }, []);

  return (
    <section className="content-container transform-all duration-1000 ">
      {content.length === 0 && (
        <div className="animate-pulse animate-once flex flex-col items-center gap-10 opacity-20 mx-auto my-auto pb-20">
          <Image
            src={"/logo_1_black.svg"}
            width={100}
            height={100}
            alt="Qr Me Logo "
          />
          <div className="text-center">
            <p>Show the world who you are.</p>
            <p>Add a link to get started.</p>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="ITEM">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-auto  min-w-1/4 max-w-1/2"
            >
              {content.map((data, index: number) => (
                <Draggable
                  key={`board-${data.id}`}
                  draggableId={`board-${data.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={"my-2"}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <CreateCard
                        content={data}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Container;
