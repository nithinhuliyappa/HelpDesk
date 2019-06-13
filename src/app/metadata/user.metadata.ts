export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  role: 'all' | 'admin' | 'employee';
  email: string;
  password: string;
}
