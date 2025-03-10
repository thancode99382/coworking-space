export class CreateVenueDto {
  name: string;
  capacity: number;
  status?: 'available' | 'unavailable';
}
