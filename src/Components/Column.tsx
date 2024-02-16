import React from 'react'
import { ColumnType } from '../Utils/enums'
import { TaskModel } from '../Utils/models'
import Task from './Task';
import useColumnTasks from '../Hooks/useColumnTasks';
import useColumnDrop from '../Hooks/useColumnDrop';

interface Props {
  column: ColumnType
  color: string;
}

function Column({ column, color }: Props) {
  const { tasks, addEmptyTask, updateTask, deleteTask, dropTaskFromColumn } = useColumnTasks(column)
  const tasksInColumn = tasks.filter((task) => task.column === column).map((task, index) => {
    return <Task key={task.id} index={index} task={task} onUpdate={updateTask}  onDelete={deleteTask} />
  })
  // drop
  const {dropRef, isOver} = useColumnDrop(column, dropTaskFromColumn)


  return (
    <div className='h-full flex flex-col items-center text-white' ref={dropRef} style={{ opacity: isOver ? 0.5 : 1 }}>
      <h2 className={color+' text-center w-fit font-semibold px-2 rounded-md text-black'}>{column}</h2>
      <button className='bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-600 w-full my-2 mt-4 rounded-md' type="button" onClick={addEmptyTask}>+</button>
      <div className='flex flex-col max-h-full overflow-hidden w-full'>
      {
        tasks.filter((task) => task.column === column).map((task, index) => {
          return <Task key={task.id} index={index} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        })
      }
      </div>
    </div>
  )
}

export default Column