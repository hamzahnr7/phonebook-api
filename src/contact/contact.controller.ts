import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
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

  @Post()
  async createContact(
    @Req() req: Request,
    @Body() createContactDto: CreateContactDto,
  ) {
    return await this.contactService.saveContact(req.user, createContactDto);
  }

  @Get()
  getContactList(@Req() req: Request) {
    return this.contactService.getAllContact(req.user);
  }

  @Get(':id')
  showContact(@Req() req: Request, @Param('id', ParseIntPipe) id: string) {
    return this.contactService.getOneContact(req.user, +id);
  }

  @Patch(':id')
  @HttpCode(204)
  updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.updateContact(+id, updateContactDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteContact(@Param('id') id: string) {
    return this.contactService.removeContact(+id);
  }
}
