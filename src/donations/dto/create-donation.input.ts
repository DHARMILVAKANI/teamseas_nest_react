import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
@InputType()
export class CreateDonationInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  mobile?: string;

  @Field({ nullable: true })
  @IsString()
  team?: string;

  @Field({ nullable: true })
  @IsString()
  message?: string;
}
