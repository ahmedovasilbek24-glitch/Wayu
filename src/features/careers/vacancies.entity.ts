import {BaseModel} from "@/core/base-model";
import {Column, Entity, ManyToOne} from "typeorm";
import type {Relation} from "typeorm";
import {VacancyType} from "@/core/enum/enum";

@Entity('vacancies')
export class VacanciesEntity extends BaseModel {
  @Column({type: "varchar", length: 256})
  title!: string;

  @Column({type: "varchar", length: 128})
  address!: string;

  @Column({type: "text"})
  description!: string;

  @Column({type: "varchar", length: 16})
  phoneNumber!: string;

  @Column({type: "enum", enum: VacancyType})
  type!: string;

  @Column({type: "varchar", length: 64})
  salary!: string;

  @Column({type: "boolean", default: true})
  isActive!: boolean;

  @ManyToOne(() => VacanciesEntity, (vacancy) => vacancy.id)
  vacancy!: Relation<VacanciesEntity>;
}