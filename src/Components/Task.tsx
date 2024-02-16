import React, { LegacyRef } from 'react'
import { TaskModel } from '../Utils/models';
import TextareaAutosize from 'react-textarea-autosize';
import { useTaskDragAndDrop } from '../Hooks/useTaskDragAndDrop';


interface Props {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], update: Omit<Partial<TaskModel>, 'id'>) => void;
  onDelete: (id: TaskModel['id']) => void;
}

function Task({ index, task, onUpdate, onDelete }: Props) {
  const { ref, isDragging } = useTaskDragAndDrop(task, index);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(task.id, { title: event.target.value })
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(task.id, { description: event.target.value })
  }
  const handleDeleteTask = () => {
    onDelete(task.id)
  }
  return (
    <div className='bg-zinc-800 p-2 my-2 rounded-lg w-fu' ref={ref as LegacyRef<HTMLDivElement>} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className='flex'>
        <input type="text" name="title" value={task.title} className='focus:outline-none font-bold w-full bg-zinc-800 border-b border-zinc-400 pb-1 mb-1' onChange={handleTitleChange} />
        <button type="button" className='mt-1 w-6 flex justify-center' onClick={handleDeleteTask}>
          <svg className='w-4 h-4 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <TextareaAutosize name="description" id="" value={task.description} className='w-full min-h-24 bg-zinc-800 focus:outline-none' onChange={handleDescriptionChange} />
    </div>
  )
}

export default Task