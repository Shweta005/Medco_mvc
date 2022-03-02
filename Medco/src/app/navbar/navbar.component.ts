import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { faAirFreshener, faBars,faBox,faBoxes,faCogs, faHome, faInbox,  faListAlt,  faPhone, faShippingFast, faSignOutAlt, faTachometerAlt,  faTicketAlt,  faUser } from '@fortawesome/free-solid-svg-icons';
import{} from '@fortawesome/fontawesome-svg-core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faSignout = faSignOutAlt;
  faHome = faHome;
  faTachometerAlt = faTachometerAlt;
  faInbox = faInbox;
  faPhone = faPhone;
  faUser = faUser;
  faCogs = faCogs;
  faShippingFast = faShippingFast;
  faTicket = faTicketAlt;
  faBoxes = faBoxes;
  faAirFreshener = faAirFreshener;
  faBars = faBars;
  faList = faListAlt;

 title :any;
  constructor(private router:Router) { }

  logout() : void{
    this.router.navigate(['/admin']);
 }
  ngOnInit() {
   this.title= localStorage.getItem('Admin');
   localStorage.clear();



$('#menu-toggle,#menu-overlay').on("click",function(){
  $('body').toggleClass('open-menu');
});

$('#main-nav li a').on("click",function(){
  $('#main-nav li').removeClass('active');
  $(this).parent().addClass('active')
});

$('#tabs li').on("click",function(){
  var clickTarget = $(this).attr('data-target');
  $('.tab-target').removeClass('targeted');
  $('#'+clickTarget).addClass("targeted");
  $('#tabs li').removeClass('active');
  $(this).addClass('active')
});

// $('#admin-search input').on('focus',function(){
//   $('#header_logo').addClass('hidden');
// });
// $('#admin-search input').on('blur',function(){
//   $('#header_logo').removeClass('hidden');
// });
  }

}
