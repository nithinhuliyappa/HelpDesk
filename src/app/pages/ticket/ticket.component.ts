import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/metadata/ticket.metadata';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  currentTicket: Ticket = null;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content, data) {
    this.currentTicket = data;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // submit form
    }, (reason) => {
    });
  }

}
