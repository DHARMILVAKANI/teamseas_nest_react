import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { Donation } from '../database/entities/donation.entity';
import { CreateDonationInput } from './dto/create-donation.input';
import { QueryReqDto } from './dto/queryReq.dto';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionsDto } from './dto/subscription.dto';

const pubsub = new PubSub();

@Resolver(() => Donation)
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation(() => Donation)
  async createDonation(@Args('createDonationInput') data: CreateDonationInput) {
    const created = await this.donationsService.createDonation(data);

    const total = await this.donationsService.donationCounts();
    const totalUpdated = { totalUpdated: total };
    pubsub.publish('totalUpdated', { totalUpdated });
    return created;
  }

  @Subscription(() => SubscriptionsDto)
  totalUpdated() {
    return pubsub.asyncIterator('totalUpdated');
  }

  @Query(() => [Donation], { name: 'donations' })
  findAll(@Args('query', { nullable: true }) query?: QueryReqDto) {
    return this.donationsService.findAllDonation(query);
  }

  @Query(() => Donation, { name: 'donation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.donationsService.findOneDonation(id);
  }

  @Query(() => Int)
  donationCounts() {
    return this.donationsService.donationCounts();
  }
}
