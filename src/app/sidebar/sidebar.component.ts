import { Component} from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { EmployeeService } from '../services/employee.service';
import { Employee, EmployeeFilterCriteria } from '../models/employee';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  departments: Array<string> = [];
  offices: Array<string> = [];
  jobTitles: Array<string> = [];
  sideBarFilteredEmpData: Employee[] = [];
  selectedDept?:  string="";
  selectedOffice?: string="";
  selectedJobTitle?: string="";
  deptObj: any;
  officesObj: any;
  jobTitleObj: any;
  criteria!: EmployeeFilterCriteria;


  constructor(
    private dataSharingService: DataSharingService,
    private employeeService: EmployeeService,
    private filterService:FilterService
  ) {}

  ngOnInit() {  
    // Calculate the count of employees in each category
    this.countOfEmployees();
    
    // Subscribe to employeeAdded$ event to update the employee count and filtered data
    this.employeeService.employeeAdded$.subscribe(() => {
      this.countOfEmployees();
    });
    
    // Subscribe to employeeUpdated$ event to update the employee count and filtered data
    this.employeeService.employeeUpdated$.subscribe(() => {
      this.countOfEmployees();
    });
  }
  
  // Handle selection of filters
  selectedFilter(filter: string, category: string) {
    if (category === 'department') {
      this.selectedDept =
        this.selectedDept === filter ? "" : filter;
    } else if (category === 'office') {
      this.selectedOffice = this.selectedOffice === filter ? "" : filter;
    } else if (category === 'jobTitle') {
      this.selectedJobTitle =
        this.selectedJobTitle === filter ? "" : filter;
    }

    // Filter employees based on the selected filters
    this.criteria = {
      Department: this.selectedDept,
      Office: this.selectedOffice,
      JobTitle: this.selectedJobTitle
    };
    this.filterService.filterEmployees(this.criteria)
    .subscribe(res => {
      const filteredEmployees:Employee[] = res.data
      // Update the filtered employee data in the data sharing service
      this.dataSharingService.updateFilteredData(filteredEmployees);
    });
  }

  // Count the number of employees in each category

  countOfEmployees(){
    this.filterService.getEmployeeCounts().subscribe((res)=>{
      this.deptObj = res.data.Department;
      this.officesObj = res.data.Office;
      this.jobTitleObj = res.data.JobTitle
      this.departments = Object.keys(this.deptObj);
    this.offices = Object.keys(this.officesObj);
    this.jobTitles = Object.keys(this.jobTitleObj);
    })
  }
  
  // Handle "View More" button click
  onclickViewMore(viewBtn: HTMLAnchorElement) {
    document.getElementById('job-title-div')?.classList.toggle('job-title-div');
    viewBtn.textContent =
      viewBtn.textContent == 'view more' ? 'view less' : 'view more';
  }

}
