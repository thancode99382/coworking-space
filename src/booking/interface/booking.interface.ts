export interface IBooking {
  userId: string;
  venueId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  adminId?: string;
}
