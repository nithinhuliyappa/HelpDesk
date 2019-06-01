import { ColumnConfig } from 'src/app/components/data-table/data-table.config';

export const TICKET_COLUMNS: ColumnConfig[] = [
  {field: 'summary', title: 'Summary'},
  {field: 'status', title: 'Status', cellTemplate: true},
  {field: 'action', title: 'Action', cellTemplate: true}
];