import { ColumnConfig } from 'src/app/components/data-table/data-table.config';

export const USER_COLUMNS: ColumnConfig[] = [
  {field: 'firstName', title: 'FirstName'},
  {field: 'lastName', title: 'lastName'},
  {field: 'email', title: 'Email'},
  {field: 'role', title: 'Role', cellTemplate: true }
];
