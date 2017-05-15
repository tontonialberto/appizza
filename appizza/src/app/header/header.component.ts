import { Component, OnInit } from '@angular/core';

import { LINKS } from "app/header/links";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  expand: boolean = false;
  links = LINKS;

  constructor() { }

  ngOnInit() {
  }
  
  // Serve ad aprire/chiudere il menu a tendina
  toggleExpand() {
    this.expand = !this.expand;
  }

  closeMenu() {
    this.expand = false;
  }

}
