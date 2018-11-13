import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  // NG MODEL - 2 WAY DATA BINDING
  user_first_name: String;
  user_last_name: String;
  user_password: String;
  user_email_id: String;
  user_new_password: String;
  user_new_email_id: String;
  user_mobile_number:Number;

  constructor(public _httpAppService: AppService, public toastr: ToastrService, public router: Router, public _route: ActivatedRoute) { }

  ngOnInit() {
    // this.checkSessionExistense('authToken'); 
  }

  valid_email: boolean = false;
  valid_password: boolean = false;
  valid_new_email: boolean = false;
  valid_new_password: boolean = false;
  valid_first_name: boolean = false;
  valid_last_name: boolean = false;
  valid_mobile_number: boolean = false;

  toggleNavbar = (e,toggle_input) =>{
    let target = e.currentTarget
    let toggle_type = $(toggle_input).val()
    let page_navbar = $('#login-page-navbar')
    let content_main = $('.page-user-login')
    if(toggle_type == 'open'){
      $(page_navbar).css("width","250px")
      $(content_main).css("margin-right","250px").css('width','calc(100% - 250px)').css('opacity','0.2')
      $(content_main).find('div.form-container.card-layout').css("right","250px")
      $('body')
    } else if(toggle_type == 'close'){
      $(page_navbar).css("width","0")
      $(content_main).css("margin-right","0").css('width','100%').css('opacity','1')
      $(content_main).find('div.form-container.card-layout').css("right","0")
      $('body').css('background-color','white')
    }
    
  }

  toggleFormType = (e,form_type) =>{
    let target = e.currentTarget
    let target_container = $(target).closest('.card-layout')
    let main_container = $(target).closest('.content-main')
    if(form_type == 'signup'){     
      $(target_container).hide('show')
      $(main_container).find('.signup-form.card-layout').css('overflow-y', 'auto')
      setTimeout(function(){
        $(main_container).find('.signup-form.card-layout').show()
        $(target_container).find('input#input-user-email').focus()  
      },500)
      
    }else if(form_type == 'login'){
      $(target_container).hide('show')
      $(target_container).css('overflow-y', 'hidden')
      setTimeout(function(){
        $(main_container).find('.login-form.card-layout').show()
        $(target_container).find('input#input-user-first-name').focus()  
      },500)     
    }
    
  }

  validateInput = (e,input_type) =>{
    if(e){
      if(input_type == 'email'){
        this.valid_email = false;
      }else if (input_type == 'password'){
        this.valid_password = false;
      }else if(input_type == 'new_email'){
        this.valid_new_email = false;
      }else if (input_type == 'new_password'){
        this.valid_new_password = false;
      }else if (input_type == 'first_name'){
        this.valid_first_name = false;
      }else if (input_type == 'last_name'){
        this.valid_last_name = false;
      }else if (input_type == 'mobile_number'){
        this.valid_mobile_number = false;
      }
    }else{
      if(input_type == 'email'){
        this.valid_email = true;
      }else if (input_type == 'password'){
        this.valid_password = true;
      }else if(input_type == 'new_email'){
        this.valid_new_email = true;
      }else if (input_type == 'new_password'){
        this.valid_new_password = true;
      }else if (input_type == 'first_name'){
        this.valid_first_name = true;
      }else if (input_type == 'last_name'){
        this.valid_last_name = true;
      }else if (input_type == 'mobile_number'){
        this.valid_mobile_number = true;
      }
    }
  }

  verifyUserAction = (e,action_type) =>{
    let target = e.currentTarget;
    let loader_div = $(target).closest('.content-main')
    $(loader_div).addClass('main-loader')
    if(action_type == 'login'){
      let content = {
        email: this.user_email_id,
        password: this.user_password
      }
      this._httpAppService.verifyLogin(content).subscribe(
        data =>{
          if(data['error'] == false){
            let res = data['data']
            let cookie_details = {
              expiry_days: 30,
              authToken: res.authToken,
              current_user_details: res.userDetails   
            }
            let current_date = new Date()
            let expiry_time = current_date.setTime(current_date.getTime() + ( cookie_details.expiry_days * 24 * 60 * 60 * 1000 )) 
            document.cookie = "authToken=" + cookie_details.authToken + ';' + expiry_time + ';path=/'
            document.cookie = "currentUserDetails=" + JSON.stringify(cookie_details.current_user_details) + ';' + expiry_time + ';path=/'
            this.router.navigate(['/chat/'])
            this.toastr.success(data['message'])
          }else{
            this.toastr.error(data['message'])
          }
          $(loader_div).removeClass('main-loader')
        },error => {
          console.log('error', error.message)
          this.toastr.error(error.error.message)
          $(loader_div).removeClass('main-loader')
        }
      );
    }
    else if(action_type == 'signup'){
      let content = {
        firstName: this.user_first_name,
        lastName: this.user_last_name,
        mobileNumber: this.user_mobile_number,
        email: this.user_new_email_id,
        password: this.user_new_password
      }
      this._httpAppService.verifySignup(content).subscribe(
        data =>{
          if(data['error'] == false){
            this.toastr.success(data['message'])
          }else{
            this.toastr.error(data['message'])
          }
          $(loader_div).removeClass('main-loader')
        },error => {
          console.log('error', error.message)
          this.toastr.error(error.error.message)
          $(loader_div).removeClass('main-loader')
        }
      );
    }
  }

}
