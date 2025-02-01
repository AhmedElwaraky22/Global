import { FormControl } from "@angular/forms";

export interface FileResponse<T> {
  success: boolean;
  data?: T;
  meta?: {
    total: number;
    current_page: number;
    last_page: number;
  };
  error?: string;
}



export interface Job {
  id: number;
  title: string;
  page: {  name: string;};
  date_published: string;
  location: string;
  type: string;
  minimum_years_of_experience: number;
  number_of_vacancies: number;
  requirements: string[];
  responsibilities: string[];
  description: string;
}


export interface JobApplicationForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  country: FormControl<string | null>;
  education: FormControl<string | null>;
  currentPosition: FormControl<string | null>;
  company: FormControl<string | null>;
  // cv: FormControl<File | null>;
  // coverLetter: FormControl<File | null>;
}

