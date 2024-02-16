import React from 'react';
import logo from './logo.svg';
import './App.css';
import Column from './Components/Column';
import { ColumnType } from './Utils/enums';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App min-h-dvh bg-zinc-700'>
        <div className="mx-10 py-6">
          <h1 className='text-3xl font-bold text-center text-white mb-6'>Kanban App</h1>
          <div className="columns grid grid-cols-4 h-5/6 w-full gap-3 ">
            <Column column={ColumnType.TO_DO} color='bg-gray-200' />
            <Column column={ColumnType.IN_PROGRESS} color='bg-cyan-200' />
            <Column column={ColumnType.BLOCKED} color='bg-red-200' />
            <Column column={ColumnType.COMPLETED} color='bg-green-200' />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
