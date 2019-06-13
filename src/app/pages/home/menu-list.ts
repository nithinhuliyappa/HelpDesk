export interface Menu {
  title: string;
  icon: string;
  link: string;
  role: 'admin' | 'employee' | 'all';
}

export const menuList: Menu[] = [
  {
    title: 'Manage Tickets',
    icon: 'view_list',
    link: '/tickets',
    role: 'all'
  },
  {
    title: 'Submit Ticket',
    icon: 'library_add',
    link: '/add-ticket',
    role: 'employee'
  },
  {
    title: 'Manage Users',
    icon: 'group',
    link: '/users',
    role: 'admin'
  }
];
