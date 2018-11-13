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
  getCookieItem = (cname) =>{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  removeUserCookie = (name) =>{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  createOrUpdateCookie = (name,data,user_data) =>{
    let cookie_details = {
      expiry_days: 30,
      authToken: data.authToken,
      customData: {
        userData : {},
        otherData: data
      }     
    }
    if(user_data){
      cookie_details.customData.userData = data
    }
    let current_date = new Date()
    let expiry_time = current_date.setTime(current_date.getTime() + ( cookie_details.expiry_days * 24 * 60 * 60 * 1000 )) 
    document.cookie = name + "=" + JSON.stringify(cookie_details.customData) + ';' + expiry_time + ';path=/'
  }
}
