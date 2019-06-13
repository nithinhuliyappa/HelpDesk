import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { TICKET_COLUMNS } from './column.config';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  items: Observable<any[]>;

  @Output()
  rowClick = new EventEmitter<any>();

  constructor(private ticket: TicketService) { }

  ngOnInit() {
    this.items = this.ticket.tickets;
    this.ticket.getTickets();
  }

  ngOnDestroy(): void {
    this.ticket.destroy();
  }

  updateStatus(ticketItem) {
    this.ticket.updateTicketStatus(ticketItem, 'open');
  }

  get columns() {
    return TICKET_COLUMNS;
  }

  onRowClick(rowData, e) {
    e.preventDefault();
    this.rowClick.emit(rowData);
  }
}
