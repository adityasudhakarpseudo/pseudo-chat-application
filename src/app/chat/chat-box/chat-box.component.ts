import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

import { ChatRequestsService } from '../../chat-requests.service'
import { AppService } from '../../app.service'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})



export class ChatBoxComponent implements OnInit {

  // public scrollMe: ElementRef;



  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  public scrollToChatTop: boolean = false;

  public receiverId: any;
  public receiverName: any;
  public previousChatList: any = [];
  public messageText: any;
  public messageList: any = []; // stores the current message list display in chat box
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;

  constructor(public router: Router, public _route: ActivatedRoute, public toastr: ToastrService, public SocketService: ChatRequestsService, public AppService: AppService) { }

  active_tab: String = '';

  ngOnInit() {

    this.authToken = this.AppService.getCookieItem('authToken');

    this.userInfo = this.AppService.getCookieItem('currentUserDetails');

    this.receiverId = this.AppService.getCookieItem('receiverId');

    this.receiverName = this.AppService.getCookieItem('receiverName');

    if (this.receiverId != null && this.receiverId != undefined && this.receiverId != '') {
      this.userSelectedToChat(this.receiverId, this.receiverName)
    }

    // this.checkStatus();

    // this.verifyUserConfirmation();
    // this.getOnlineUserList()

    // this.getMessageFromAUser()

  }

  fetchActiveTab = (e, tab_type) => {
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

  logoutUser = (e) => {
    let loader_div = $('.page-chat-box')
    $(loader_div).addClass('main-loader')
    let _this = this
    window.setTimeout(function () {
      _this.removeUserCookie('currentUserDetails')
      _this.removeUserCookie('authToken')
      $(loader_div).removeClass('main-loader')
      _this.router.navigate(['/login'])
    }, 2000)

  }

  removeUserCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  userSelectedToChat = (receiverId, receiverName) => {
    this.userList.map((user) => {
      if (user.userId == receiverId) {
        user.chatting = true;
      }
      else {
        user.chatting = false;
      }
    })
    

    this.AppService.createOrUpdateCookie('receiverId', receiverId, false);
    this.AppService.createOrUpdateCookie('receiverName', receiverName, false);


    this.receiverName = receiverName;

    this.receiverId = receiverId;

    this.messageList = [];

    this.pageValue = 0;

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: receiverId
    }


    // this.SocketService.markChatAsSeen(chatDetails);

    // this.getPreviousChatWithAUser();

  }

}
