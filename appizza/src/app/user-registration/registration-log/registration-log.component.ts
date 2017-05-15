import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registration-log',
  templateUrl: './registration-log.component.html',
  styleUrls: ['./registration-log.component.css']
})
export class RegistrationLogComponent implements OnInit {
  @Input("result") display: any;

  constructor() { }

  ngOnInit() {
  }

}
