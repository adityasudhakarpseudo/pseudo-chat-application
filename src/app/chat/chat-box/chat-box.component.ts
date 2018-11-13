import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})



export class ChatBoxComponent implements OnInit {

  constructor(public router: Router, public _route: ActivatedRoute, public toastr: ToastrService) { }
  
  active_tab: String = '';

  ngOnInit() {
    
  }

  fetchActiveTab = (e,tab_type) =>{
    e.preventDefault()
    e.stopPropagation()
    let target = e.currentTarget
    let container = $(target).closest('.content-sidebar')
    let nav_menu = $(container).find('.nav-chat-box')
    let tab_menu = $(container).find('.tab-content-chat-box')
    let current_active_tab = $(target).attr('href')
    this.active_tab = current_active_tab;
    $(nav_menu).find('.nav-link').removeClass('active')
    $(tab_menu).find('.tab-pane').removeClass('show').removeClass('active')
    $(target).addClass('active')
    $(tab_menu).find(tab_type).addClass('show').addClass('active')
  }

  logoutUser = (e) =>{
    let loader_div = $('.page-chat-box')
    $(loader_div).addClass('main-loader')
    let _this = this
    window.setTimeout(function(){
      _this.removeUserCookie('currentUserDetails')
      _this.removeUserCookie('authToken')
      $(loader_div).removeClass('main-loader')
      _this.router.navigate(['/login'])
    },2000)
    
  }

  removeUserCookie = (name) =>{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}
