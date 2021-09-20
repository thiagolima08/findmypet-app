import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isExpanded = true;
  @ViewChild('sidenav') sidenav: MatSidenav;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['home'])
  }

  anunciar(){
    this.router.navigate(['home/create'])
  }

  myPosts(){
    this.router.navigate(['home/minhas-postagens'])
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
