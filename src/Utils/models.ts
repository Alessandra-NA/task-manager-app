import { ColumnType } from "./enums";

export interface TaskModel {
  id: string,
  title: string,
  column: ColumnType,
  description: string
}

export interface DraggedItem {
  index: number,
  id: TaskModel['id'],
  fromColumn: ColumnType
}