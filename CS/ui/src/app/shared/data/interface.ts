export interface Request {
  title?: string;
  message?: string;
  body?: any;
  status?: string;
}

export interface Menu {
  title: string;

  link?: string;
  icon?: string;
  show?: boolean;
  disabled?: boolean;
  children?: Menu[];
  groupsAccess?: number[];
}

export interface Base {
  id?: string;
  name?: string;
  value?: string;
}

export interface Student {
  id?: string;

  fullname: string;
  birthday: string;

  group: string;
  course: number;
  formAdmission: string;
  dayEnrollment: string;

  statusStudy: string;
  formStudy: string;

  statusBenefit: string;
  scholarship: string;

  is_removed: boolean;
}

export interface Teacher {
  id?: string;

  fullname: string;
  birthday: string;

  dayHiring: string;
  dayAppointment: string;

  position: string;
  statusScientific: string;

  is_removed: boolean;
}

export interface Disciplines {
  id?: string;
  name: string;
  department: string;
  teacher: string[];
}
