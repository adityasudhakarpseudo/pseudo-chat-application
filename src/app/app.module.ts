import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, Injectable } from '@angular/core';

import { AppComponent } from './app.component';

// ROUTING
import { RouterModule, Routes, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

// ANIMATION AND TOAST
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// SERVICES
import { AppService } from './app.service';

// MODULES
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

// COMPONENTS
import { LoginComponent } from './user/login/login.component';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';

@Injectable()
class AlwaysAuthGuard implements CanActivate {
  
  constructor(public router: Router, public _route: ActivatedRoute, public toastr: ToastrService) { }
  
  canActivate() {
    let flag_auth_token_exist = this.checkSessionExistense()
    return flag_auth_token_exist;
  }

  checkSessionExistense = () =>{
    let auth_token_existense = this.checkAuthenticationTokenPresense("authToken");
    if (auth_token_existense != "") {
      this.router.navigate(['/chat'])
      return false;
    }else{
      return true;
    }
  }

  checkAuthenticationTokenPresense = (cname) =>{
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
}

@Injectable()
class CheckUserDetailsAuth implements CanActivate {

  constructor(public router: Router, public _route: ActivatedRoute, public toastr: ToastrService) { }

  canActivate() {
    let flag_user_exist = this.checkCurrentUserExistense()
    return flag_user_exist;
  }

  checkCurrentUserExistense = () =>{
    let user_details = this.getCurrentLoggedInUserDetails("currentUserDetails");
    if (user_details != "") {
      let user_data = JSON.parse(user_details)
      this.toastr.success('Welcome Back')
      return true;
    }else{
      this.removeUserCookie('currentUserDetails')
      this.removeUserCookie('authToken')
      return false;
    }
  }

  removeUserCookie = (name) =>{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/login'])
  }

  getCurrentLoggedInUserDetails = (cname) =>{
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
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserModule,
    ChatModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { 
        path:'login', 
        component: LoginComponent, 
        canActivate: [AlwaysAuthGuard]
      },
      { path: 'chat', 
        component: ChatBoxComponent, 
        canActivate: [CheckUserDetailsAuth],
      },
      { path: 'home', redirectTo: 'login', pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [AppService, AlwaysAuthGuard, CheckUserDetailsAuth], // To inject SERVICES into the application or component as per requirements.
  bootstrap: [AppComponent]
})
export class AppModule { }
