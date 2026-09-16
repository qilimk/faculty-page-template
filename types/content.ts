export interface Profile {
  name: string;
  title: string;
  dept: string;
  university: string;
  office: string;
  email: string;
  phone: string;
  description: string;
}

export interface Links {
  cv: string;
  scholar: string;
  github: string;
  linkedin: string;
  x: string;
  email: string;
}

export interface Update {
  date: string;
  text: string;
}

export interface TeachingItem {
  term: string;
  title: string;
  link?: string;
}

export interface GroupMember {
  name: string;
  role: string;
  site?: string;
}

export interface Experience {
  year: string;
  text: string;
}

export interface Award {
  year: string | number;
  text: string;
}

export interface Talk {
  date: string;
  title: string;
}

export interface Press {
  year: string | number;
  outlet: string;
  title: string;
  link?: string;
}
