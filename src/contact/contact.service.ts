import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async saveContact(id: any, createContactDto: CreateContactDto) {
    const contactDto = await this.contactRepository.create({
      ...createContactDto,
      user: id,
    });
    return await this.contactRepository.save(contactDto);
  }

  async getAllContact(id: any) {
    return await this.contactRepository.find({ where: { user: { id } } });
  }

  async getOneContact(userId: any, id: number) {
    return await this.contactRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async updateContact(id: number, updateContactDto: UpdateContactDto) {
    return await this.contactRepository.update(id, { ...updateContactDto });
  }

  async removeContact(id: number) {
    return await this.contactRepository.delete(id);
  }
}
