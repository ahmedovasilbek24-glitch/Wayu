import {BaseModel} from "@/core/base-model";
import {Column, Entity, ManyToOne} from "typeorm";
import {ApplicationStatus} from "@/core/enum/enum";
import {VacanciesEntity} from "./vacancies.entity";
import type{Relation} from "typeorm";

@Entity('applications')
export class ApplicationsEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    fullName!: string;

    @Column({type: "varchar", length: 16})
    phoneNumber!: string;

    @Column({type: "varchar", length: 64})
    email!: string;

    @Column()
    vacancyId!: string;

    @ManyToOne(() => VacanciesEntity, (vacancy) => vacancy.id)
    vacancy!: Relation<VacanciesEntity>;

    @Column({type: "varchar", length: 128})
    resume!: string;

    @Column({type: "enum", enum: ApplicationStatus})
    status!: string;
}