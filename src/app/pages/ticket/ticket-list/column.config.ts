import { ColumnConfig } from 'src/app/components/data-table/data-table.config';

export const TICKET_COLUMNS: ColumnConfig[] = [
  {field: 'subject', title: 'Subject'},
  {field: 'status', title: 'Status', cellTemplate: true},
  {field: 'priority', title: 'Priority', cellTemplate: true},
  {field: 'assignedUser', title: 'Assigned To'},
  {field: 'action', title: 'Action', cellTemplate: true}
];
