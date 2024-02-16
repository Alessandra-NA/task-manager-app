import { useDrop } from "react-dnd";
import { ColumnType, ItemType } from "../Utils/enums";
import { DraggedItem, TaskModel } from "../Utils/models";

function useColumnDrop(column: ColumnType, handleDrop: (fromColumn: ColumnType, id: TaskModel['id']) => void) {
  // chequear si una columna fue hovered
  const [{ isOver }, dropRef] = useDrop<DraggedItem, void, { isOver: boolean }>(() => ({
    accept: ItemType.TASK, // el tipo de item que acepta
    drop: (item) => {
      if (!item || item.fromColumn === column) {
        return;
      }
      handleDrop(item.fromColumn, item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  return { dropRef, isOver }
}

export default useColumnDrop