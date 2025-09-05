import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8081'; // Backend URL

  constructor(private http: HttpClient) { }

  // user login
  login(credentials: { email: string; password: string }) {
    const loginService = this.http.post(`${this.apiUrl}/user/login`, credentials);
    loginService.subscribe((response: any) => {
      console.log(response);
    });
    return loginService;
  }

  // get-all-users
  getAllUsers(): any {
    const accessToken = localStorage.getItem('accessToken') || null;
    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` };
      return this.http.get(`${this.apiUrl}/user/get-all-users`, { headers });
    }
    else {
      console.error('No auth token found');
      alert('Unauthorized!');
      return null;
    }
  }
}

export default ApiService;
