import { useDrag } from "react-dnd";
import { DraggedItem, TaskModel } from "../Utils/models";
import { useRef } from "react";

export function useTaskDragAndDrop<T extends HTMLElement>(task: TaskModel, index: number) {
  const ref = useRef<T>(null);
  // drag hook
  const [{ isDragging }, drag] = useDrag<DraggedItem, void, { isDragging: boolean }>({
    type: 'task',
    item: { index, id: task.id, fromColumn: task.column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  // tener item arrastrado
  drag(ref);
  return { ref, isDragging }
}