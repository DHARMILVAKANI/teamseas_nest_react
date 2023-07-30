import { Field, InputType } from '@nestjs/graphql';
import { SortType } from '../../common/constant';

@InputType()
export class QueryReqDto {
  @Field({ nullable: true })
  field?: string;

  @Field({ nullable: true })
  direction?: SortType;

  @Field({ nullable: true })
  search?: string;
}
