import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  items: Observable<any[]>;

  constructor(private ticket: TicketService) { }

  ngOnInit() {
    this.items = this.ticket.getTickets();
  }

}
