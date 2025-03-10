// booking.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
  venueId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  adminId?: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
