export interface Ticket {
  id: string;
  status: string;
  priority: string;
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
