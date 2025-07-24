export interface BookingItem {
  id: string;
  name: string;
  capacity: number;
  type: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  specialty: string;
  email: string;
}

export interface CourseItem {
  id: string;
  name: string;
  duration: string; 
  students: number;
}

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  course: string;    
  chTeorica: string; 
  chPratica: string; 
  credits: number; 
}
export interface ManagedItem {
  id: string;
  [key: string]: any; 
}
export interface NavItem { 
  label: string;
  path: string;
}