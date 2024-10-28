export interface Course {
  _id:                 string;
  title:               string;
  description:         string;
  images:              string[];
  level:               string;
  duration:            number;
  modules:             string[];
  prerequisites:       string;
  additionalResources: string[];
  passingScore:        number;
  status:              string;
  startDate:           Date;
  teacher:             Teacher;
  students:            any[];
  createdAt:           Date;
  __v:                 number;
}

export interface Teacher {
  _id:      string;
  username: string;
  email:    string;
  role:     string;
  students: any[];
  parents:  any[];
  courses:  string[];
  __v:      number;
}
