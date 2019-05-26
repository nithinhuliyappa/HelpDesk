import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Output()
  linkClick = new EventEmitter<string>();

  ngOnInit() {
  }

  onLinkClick(link, e) {
    e.preventDefault();
    this.linkClick.emit(link);
  }

}
