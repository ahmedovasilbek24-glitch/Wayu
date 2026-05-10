import {BaseModel} from "@/core/base-model";
import {Column, Entity, ManyToOne} from "typeorm";
import {CountriesEntity} from "../../common/counties/countries.entity";
import type{Relation} from "typeorm";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@Entity('branches')
export class BranchesEntity extends BaseModel {
  @Column({type: 'int'})
  countryId!: number;

  @Column({type: 'int'})
  representativeId!: number;

  @Column({type: 'varchar', length: 64})
  city!: string;

  @Column({type: 'decimal'})
  latitude!: number;

  @Column({type: 'decimal'})
  longitude!: number;

  @Column({type: 'varchar', length: 16})
  phoneNumber!: string;

  @ManyToOne(() => CountriesEntity, (country) => country.branch)
  country?: Relation<CountriesEntity>

  @ManyToOne(() => RepresentativesEntity, (representative) => representative.branch)
  representative?: Relation<RepresentativesEntity>
}