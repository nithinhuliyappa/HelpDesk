export interface Menu {
  title: string;
  icon: string;
  link: string;
}

export const menuList: Menu[] = [
  {
    title: 'Manage Tickets',
    icon: 'view_list',
    link: '/tickets'
  },
  {
    title: 'Submit Ticket',
    icon: 'library_add',
    link: '/add-ticket'
  },
  {
    title: 'Manage Users',
    icon: 'group',
    link: '/users'
  }
];
