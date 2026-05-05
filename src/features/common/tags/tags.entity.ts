import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'
import {BaseModel} from "@/core/base-model"
import type {Relation} from "typeorm";
import {NewsEntity} from "@/features/news/news/news.entity";
import {FaqsEntity} from "@/features/support/faqs.entity";
import {FaqsTagsEntity} from "@/features/common/tags/faqsTags.entity";
import {NewsTagsEntity} from "@/features/news/news-tags/newsTags.entity";

@Entity('tags')
export class Tags extends BaseModel {
  @Column({ type: 'varchar', length: 64, unique: true })
  title!: string;

  @ManyToMany(() => NewsEntity, (news) => news.tags)
  news: Relation<NewsEntity[]>;

  @OneToMany(() => NewsTagsEntity, (newsTag) => newsTag.tag)
  newsTags: Relation<NewsTagsEntity[]>;

  @ManyToMany(() => FaqsEntity, (faq) => faq.tags)
  faqs: Relation<FaqsEntity[]>;

  @OneToMany(() => FaqsTagsEntity, (faqsTag) => faqsTag.tag)
  faqsTags: Relation<FaqsTagsEntity[]>;
}
