export interface Board {
  name: string;
  columns: Column[];
}
export interface Column {
  name: string;
  tasks: Task[];
}
export interface Task {
  title: string;
  description: string;
  subTasks: SubTask[];
}
export interface SubTask {
  title: string;
  isCompleted: boolean;
}
export interface BoardDisplayUnit {
  boards: Board[];
  currBoardIndex: number;
  currColumnIndex: number;
  currTaskIndex: number;
  currTaskModalMode: "view" | "edit" | "delete";
}
