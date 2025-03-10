import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel
      .find()
      .populate('userId')
      .populate('venueId')
      .exec();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingModel
      .findById(id)
      .populate('userId')
      .populate('venueId');
    if (!booking)
      throw new NotFoundException(`Booking with id ${id} not found`);
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const updateBooking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateBookingDto,
    );
    if (!updateBooking)
      throw new NotFoundException(`Booking with id ${id} not found`);
    return updateBooking;
  }

  async remove(id: string): Promise<Booking> {
    const deleteBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deleteBooking)
      throw new NotFoundException(`Booking with id ${id} not found`);
    return deleteBooking;
  }
}
