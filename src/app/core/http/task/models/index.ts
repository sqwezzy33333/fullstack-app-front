export interface CreateTask {
  name: string;
  description: string;
  date: string;
  assigneeId?: number | null;
  status?: number | null;
}

export interface Task extends CreateTask{
    id: number;
    createdAt: string;
    creatorId: number;
  }
