export enum PanelRole{
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent'
}

export interface Panel{
  title: string;
  desc: string;
  link: string;
  role: PanelRole;
}