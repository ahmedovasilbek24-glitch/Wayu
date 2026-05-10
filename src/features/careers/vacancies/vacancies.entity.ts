import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import type {Relation} from "typeorm";
import {VacancyType} from "@/core/enum/enum";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";

@Entity('vacancies')
export class VacanciesEntity extends BaseModel {
  @Column({ type: 'varchar', length: 256 })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  address!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber!: string;

  @Column({ type: 'enum', enum: VacancyType })
  type!: VacancyType;

  @Column({ type: 'varchar', length: 64 })
  salary!: string;

  @Column({ type: 'bool', default: true })
  isActive!: boolean;

  @OneToMany(() => ApplicationsEntity, (application) => application.vacancy)
  application?: Relation<ApplicationsEntity[]>;
}