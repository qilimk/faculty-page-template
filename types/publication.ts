export interface Links {
  pdf?: string;
  code?: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links?: Links;
  tags?: string[];
}

