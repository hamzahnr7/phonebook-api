import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('userContact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getAllContact(@Req() req: Request) {
    // return this.contactService.getAllContact(req.user);
    return this.contactService.getAllContact();
  }

  // @Post()
  // createContact(
  //   @Req() req: Request,
  //   @Body() createContactDto: CreateContactDto,
  // ) {
  //   console.log(req.user);
  //   // return this.contactService.insertContact(createContactDto);
  //   return 'Hello World';
  // }

  @Get(':id')
  getOneContact(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  deleteContact(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
