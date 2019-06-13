import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  @Input() ticketFromParent: Object;

  constructor() { }

  ngOnInit() {
  }

}
