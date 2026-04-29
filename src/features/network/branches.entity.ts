import {BaseModel} from "@/core/base-model";
import {Column, Entity, ManyToOne} from "typeorm";
import {CountriesEntity} from "../common/countries.entity";
import type{Relation} from "typeorm";

@Entity('branches')
export class BranchesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    city!: string;

    @Column({type: "decimal", precision: 10, scale: 7})
    latitude!: string;

    @Column({type: "decimal", precision: 10, scale: 7})
    longitude!: string;

    @Column({type: "varchar", length: 16})
    phoneNumber!: string

    @Column()
    countryId!: number;

    @Column()
    representativeId!: number;

    @ManyToOne(() => CountriesEntity, (country)=> country.branch)
    country!: Relation<CountriesEntity>;
}