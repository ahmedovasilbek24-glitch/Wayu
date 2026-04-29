import {Column, Entity, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import type {Relation} from "typeorm";
import {CountriesEntity} from "@/features/common/countries.entity";
import {Tags} from "@/features/common/tags.entity";
import {NewsTagsEntity} from "@/features/news/news-tags/newsTags.entity";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";

@Entity('news')
export class NewsEntity extends BaseModel {
  @Column({type: "int"})
  categoryId!: number

  @Column({type: "int"})
  countryId!: number

  @Column({type: "varchar", length: 256})
  title!: string

  @Column({type: "varchar", length: 128})
  image!: string

  @Column({type: "date"})
  date!: string

  @Column({type: "text"})
  content!: string

  @ManyToOne(() => NewsCategoriesEntity, (category) => category.news
  )
  category?: Relation<NewsCategoriesEntity>

  @ManyToOne(() => CountriesEntity, (country) => country.news)
  country?: Relation<CountriesEntity>

  @ManyToMany(() => Tags, (tag) => tag.news)
  tags: Relation<Tags[]>;

  @OneToMany(() => NewsTagsEntity, (newsTag) => newsTag.news)
  newsTags: Relation<NewsTagsEntity[]>;
}
