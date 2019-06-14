import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  currentTicket = null;

  constructor(private modalService: NgbModal, private ticket: TicketService) { }

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
