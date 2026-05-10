import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import type {Relation} from "typeorm";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";

@Entity('event')
export class EventsEntity extends BaseModel {
  @Column({type: 'int'})
  categoryId!: number

  @Column({type: 'varchar', length: 256})
  title!: string

  @Column({type: 'text'})
  content!: string

  @Column({type: 'varchar', length: 128})
  image!: string

  @Column({type: 'date'})
  date!: string

  @Column({type: 'varchar', length: 128})
  address!: string

  @ManyToOne(() => EventCategoriesEntity, (evenCategory) => evenCategory.events)
  eventCategory?: Relation<EventCategoriesEntity>
}