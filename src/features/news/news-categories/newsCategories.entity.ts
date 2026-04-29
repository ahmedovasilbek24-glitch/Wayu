import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import {NewsEntity} from "@/features/news/news/news.entity";
import type{Relation} from "typeorm";

@Entity('news-category')
export class NewsCategoriesEntity extends BaseModel {
  @Column({type: "varchar", length: 64, unique: true})
  title!: string

  @OneToMany(() => NewsEntity, (news) => news.category)
  news?: Relation<NewsEntity[]>
}