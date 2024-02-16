import { useLocalStorage } from "usehooks-ts";
import { ColumnType } from "../Utils/enums";
import { TaskModel } from "../Utils/models";

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[]
  }>('tasks', {
    'Por hacer': [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        column: ColumnType.TO_DO
      }
    ],
    'En progreso': [],
    'Bloqueado': [],
    'Completado': []
  });
}

export default useTaskCollection;