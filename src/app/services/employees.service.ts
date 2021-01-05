import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Employee } from '../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getEmployees(){
    return this.http.get<Employee[]>(this.auth.url+'/getEmployees')
  }

  addEmployee(employee: Employee){
    return this.http.post(this.auth.url+'/addEmployee',employee)
  }

  getEmployee(employeeId: string){
    return this.http.get<Employee>(this.auth.url+`/getEmployee/${employeeId}`)
  }

  deleteEmployee(employeeId: string){
    return this.http.delete(this.auth.url+`/deleteEmployee/${employeeId}`)
  }

  editEmployee(employee: Employee){
    return this.http.put(this.auth.url+`/editEmployee`,employee)
  }

  uploadImageEmployee(image: File,id: string){
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    return this.http.post(this.auth.url+`/images`,formData)
  }

  getImageEmployee(id: string){
    return this.http.get(this.auth.url+'/images/'+id)
  }

}
