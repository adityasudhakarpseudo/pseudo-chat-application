import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as Rx from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  base_url = 'https://chatapi.edwisor.com/api/v1'
  constructor(private _http: HttpClient) { 
    sessionStorage.setItem('authToken','ZWZmZjg2Mzc0MGNlZDQ1NTRmNTVmNDY5NTgzZjFiNDBhMGU4ZTgxZGYyOGIyNTcyOWYxYWMwOTg4ZjE5NGJjMzc3MjlmZjY2ZDMxMDI5YWU3M2VhNjhmZDlkZjI3NjYyMzdiYWZlYWRmYTAwNzczNWIyOTYxNjUzOTQwMjcwYmYxMA')
  }

  verifyLogin = (data) =>{
    data.apiKey = sessionStorage.getItem('authToken')
    let response = this._http.post(this.base_url + '/users/login', data)
    return response
  }
  verifySignup = (data) =>{
    data.apiKey = sessionStorage.getItem('authToken')
    let response = this._http.post(this.base_url + '/users/signup', data)
    return response
  }
}
