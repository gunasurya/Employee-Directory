export class Employee {
  id?: string = '';
  department: string = '';
  email: string = '';
  firstName: string = '';
  image?: string;
  lastName: string = '';
  office: string = '';
  phoneNumber: string = '';
  skypeId: string = '';
  jobTitle: string = '';
}
export enum FilterOption {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Department = 'department',
  Office = 'office',
}

export class User {
  name!: string;
  role:string = "user";
  email!: string;
  username!: string;
  password!: string;
}

export class EmployeeFilterCriteria {
  Department? :string ="";
   Office?:string ="";
   JobTitle?:string =""
}