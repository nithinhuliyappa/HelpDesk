import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ticket } from 'src/app/metadata/ticket.metadata';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TicketCommentService } from 'src/app/services/ticket-comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit, OnDestroy {

  @Input()
  ticket: Ticket;

  comments: Observable<any[]>;

  form: FormGroup;

  constructor(private ticketComment: TicketCommentService,
              private user: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl('')
    });

    this.ticketComment.getTicketComments(this.ticket.id);
    this.comments = this.ticketComment.comments;
  }

  ngOnDestroy(): void {
    this.ticketComment.destroy();
  }

  get userId() {
    return this.user.userProfile.uid;
  }

  addComment() {
    this.ticketComment
    .addComment(this.ticket.id, this.userId, this.form.get('message').value)
    .then((key: string) => this.form.reset())
    .catch(error => console.log(error));
  }

}
