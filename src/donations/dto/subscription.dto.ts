import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionsDto {
  @Field(() => Int)
  totalUpdated: number;
}
