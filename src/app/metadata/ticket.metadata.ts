export interface Ticket {
  id: string;
  status: string;
  priority: string;
  assignedTo: string;
  assignedUser: string;
  createdDate: string;
  createdUser: string;
  createdUserName: string;
  lastUpdatedDate: string;
  summary: string;
  comments?: TicketComment[];
  workNotes: string;
  resolvedComment: string;
}

export interface TicketComment {
  message: string;
  uid: string;
  name: string;
}

export const TICKET_STATUS = [
  {label: 'Choose Status...', value: ''},
  {label: 'Open', value: 'open'},
  {label: 'In Progress ', value: 'inProgress'},
  {label: 'Pending User Response', value: 'pending'},
  {label: 'Resolved ', value: 'resolved'},
];

export const TICKET_PRIORITY = [
  {label: 'Choose Priority...', value: ''},
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
];
