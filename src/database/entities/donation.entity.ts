import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('Donations')
export class Donation extends BaseEntity {
  @Field({ nullable: true })
  id: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  count: number;

  @Field()
  @Column({ type: 'varchar' })
  displayName: string;

  @Field()
  @Column({ type: 'varchar' })
  email: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  mobile: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  team: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  message: string;
}
