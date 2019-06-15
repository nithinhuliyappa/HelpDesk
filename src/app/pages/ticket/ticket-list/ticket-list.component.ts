import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { TICKET_COLUMNS } from './column.config';
import { TICKET_STATUS } from 'src/app/metadata/ticket.metadata';

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

  getStatus(key) {
    return TICKET_STATUS.find(status => key === status.value).label;
  }

  get columns() {
    return TICKET_COLUMNS;
  }

  onRowClick(rowData, e) {
    e.preventDefault();
    this.rowClick.emit(rowData);
  }
}
