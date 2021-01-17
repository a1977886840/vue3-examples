export interface Course {
  id: number;
  name?: string;
  createDate?: string;
}
export interface User {
  id?: number;
  name?: string;
  address?: string;
  sex?: string;
  title?: Title | null;
  courses?: Course[] | null;
}

export interface Title {
  id: number;
  name: string;
}
