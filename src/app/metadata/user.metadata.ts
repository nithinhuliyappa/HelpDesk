export interface UserProfile {
  uid: string;
  id: string;
  role: 'all' | 'admin' | 'employee';
}
