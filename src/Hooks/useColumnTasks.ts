import { useCallback } from "react"
import useTaskCollection from "./useTaskCollection"
import { ColumnType } from "../Utils/enums"
import { TaskModel } from "../Utils/models"

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection()

  const addEmptyTask = useCallback(() => {
    setTasks((allTasks) => {
      const columnTasks = allTasks[column]
      const newColumnTask: TaskModel = {
        id: String(Date.now()),
        title: 'Título',
        description: 'Descripción',
        column
      };
      return {
        ...allTasks,
        [column]: [...columnTasks, newColumnTask]
      }
    })
  }, [column, setTasks])

  const updateTask = useCallback(
    // entra todo excepto id
    (id: TaskModel['id'], update: Omit<Partial<TaskModel>, 'id'>) => {
      console.log('updating with info:' + JSON.stringify(update))

      setTasks((allTasks) => {
        const columnTasks = allTasks[column]
        return {
          ...allTasks,
          [column]: columnTasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                ...update
              }
            }
            return task
          })
        }
      })
    },
    [column, setTasks]
  )

  const deleteTask = useCallback((id: TaskModel['id']) => {
    setTasks((allTasks) => {
      const columnTasks = allTasks[column]
      return {
        ...allTasks,
        [column]: columnTasks.filter((task) => task.id !== id)
      }
    })
  }, [column, setTasks])

  const dropTaskFromColumn = (from: ColumnType, taskId: TaskModel['id']) => {
    setTasks((allTasks) => {
      const fromColumn = allTasks[from]
      const toColumn = allTasks[column]
      const taskMoving = fromColumn.find((task) => task.id === taskId)
      console.log('moving task '+taskMoving?.id+' from '+from+' to '+column)
      if (!taskMoving) return allTasks
      return {
        ...allTasks,
        [from]: fromColumn.filter((task) => task.id !== taskId),
        [column]: [{...taskMoving, column}, ...toColumn]
      }
    })
  }

  return {
    // devuelve las tareas de la columna especificada
    tasks: tasks[column],
    // y un método para crear una tarea vacía
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFromColumn
  }
}





export default useColumnTasks