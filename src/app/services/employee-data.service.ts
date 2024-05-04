import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  deptArray:Array<string> = ["IT Department","UX Department","Sales","MD","HR Department"]  
  officeArray:Array<string> = ["Seattle","India"]
  jobTitleArray:Array<string> = [
    "SharePoint Practice Head",
    ".Net Development Lead",
    "Recruiting Expert",
    "BI Developer",
    "Business Analyst",
    "Operations Manager",
    "Product Manager",
    "Lead Engineer - Dot Net",
    "Network Engineer",
    "Talent Manager Jr.",
    "Software Engineer",
    "UI Designer"
  ]
  constructor() { }
}
