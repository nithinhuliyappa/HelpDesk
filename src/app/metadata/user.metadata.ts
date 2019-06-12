export interface UserProfile {
  uid: string;
  id: string;
  firstName: string;
  lastName: string;
  role: 'all' | 'admin' | 'employee';
}
