import { Component } from '@angular/core';
import {TextFieldComponent} from '../../innerComponents/Form/text-field/text-field.component';
import {TextAreaComponent} from '../../innerComponents/Form/text-area/text-area.component';
import {PasswordFieldComponent} from '../../innerComponents/Form/password-field/password-field.component';
import {RouterLink} from '@angular/router';
import {ApiService} from '../../../../../services/api.service';

@Component({
  selector: 'app-staff',
  imports: [
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    RouterLink
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {

  constructor(
    private apiService : ApiService
  ){}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((res:any)=>{
      console.log(res);
      const tbody = document.getElementById('tbody');
      res.forEach((user:any) => {
        if(user.role === 'staff'){
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>
              <a href="/users/staff/${user.id}" class="btn btn-sm btn-primary">View</a>
            </td>
          `;
          tbody?.appendChild(tr);
        }
    });
    });
  }

}
