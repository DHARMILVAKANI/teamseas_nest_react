import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDonationInput } from './dto/create-donation.input';
import { Repository } from 'typeorm';
import { Donation } from '../database/entities/donation.entity';
import { connection } from '../database/database.module';
import { createDonationMapper } from './mapper/Donation.mapper';
import { QueryReqDto } from './dto/queryReq.dto';

@Injectable()
export class DonationsService {
  donationRepo: Repository<Donation>;
  constructor() {
    this.donationRepo = connection.getRepository(Donation);
  }
  async createDonation(data: CreateDonationInput) {
    try {
      const donationReqData = createDonationMapper(
        Object.assign(new Donation(), data),
      );
      const donation = await this.donationRepo.save(donationReqData);
      return donation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllDonation(query?: QueryReqDto) {
    const { direction, field, search } = query || {};
    try {
      const querryRunner = this.donationRepo.createQueryBuilder('d');
      if (field && direction) {
        querryRunner.orderBy(`d.${field}`, direction ? direction : 'DESC');
      }
      if (search) {
        querryRunner.andWhere('d.displayName like :displayName', {
          displayName: `%${search}%`,
        });
      }
      const [donations] = await querryRunner.getManyAndCount();
      return donations;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findOneDonation(id: number) {
    const donation = await this.donationRepo.findOne({
      where: { id: id as any },
    });
    return donation;
  }

  async donationCounts() {
    try {
      const data = await this.donationRepo.find();
      const totalCount = data.reduce(
        (sum, donation) => sum + donation.count,
        0,
      );

      return totalCount;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
