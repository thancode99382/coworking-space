import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/roles.guard';
import { Roles } from 'src/user/roles.decorator';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // Combine JWT and Role Guards
  @Roles('user')
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(id);
  }
}
