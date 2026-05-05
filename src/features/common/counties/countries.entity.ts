import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import type {Relation} from "typeorm";
import {BranchesEntity} from "@/features/network/branches.entity";
import {NewsEntity} from "@/features/news/news/news.entity";

@Entity('country')
export class CountriesEntity extends BaseModel {
  @Column({type: "varchar", length: 64})
  title!: string;

  @Column({type: "varchar", length: 128})
  flag!: string;

  @OneToMany(() => BranchesEntity, branch => branch.country)
  branch?: Relation<BranchesEntity>

  @OneToMany(() => NewsEntity, (news) => news.country)
  news?: Relation<NewsEntity[]>;

}