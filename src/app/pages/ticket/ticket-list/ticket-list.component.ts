import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { TICKET_COLUMNS } from './column.config';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  items: Observable<any[]>;

  @Output()
  rowClick = new EventEmitter<any>();

  constructor(private ticket: TicketService) { }

  ngOnInit() {
    this.items = this.ticket.getTickets();
  }

  get columns() {
    return TICKET_COLUMNS;
  }

  onRowClick(rowData, e) {
    e.preventDefault();
    this.rowClick.emit(rowData);
  }
}
