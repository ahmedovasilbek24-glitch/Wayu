import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany, Relation} from "typeorm";
import {EventsEntity} from "@/features/events/event/events.entity";

@Entity('events-category')
export class EventCategoriesEntity extends BaseModel {
    @Column({type: "varchar", length: 64, unique: true})
    title!: string;

  @OneToMany(() => EventsEntity, (event) => event.eventCategory, {onDelete: "RESTRICT"})
  events?: EventsEntity[]
}