import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venue, VenueDocument } from './schemas/venue.schema';
import { Model } from 'mongoose';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private venueModel: Model<VenueDocument>,
  ) {}

  create(createVenueDto: CreateVenueDto) {
    const newVenue = new this.venueModel(createVenueDto);
    return newVenue.save();
  }

  findAll() {
    return this.venueModel.find().exec();
  }

  findOne(id: string) {
    return this.venueModel.findById(id).exec();
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.venueModel
      .findByIdAndUpdate(id, updateVenueDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.venueModel.findByIdAndDelete(id).exec();
  }
}
