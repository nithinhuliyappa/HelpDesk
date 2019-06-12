import { ColumnConfig } from 'src/app/components/data-table/data-table.config';

export const TICKET_COLUMNS: ColumnConfig[] = [
  {field: 'summary', title: 'Summary'},
  {field: 'status', title: 'Status', cellTemplate: true},
  {field: 'priority', title: 'Priority'},
  {field: 'assignedUser', title: 'Assigned To'},
  {field: 'action', title: 'Action', cellTemplate: true}
];
