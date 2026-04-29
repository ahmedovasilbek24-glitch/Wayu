import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import type {Relation} from "typeorm";
import {NewsEntity} from "@/features/news/news/news.entity";
import {Tags} from "@/features/common/tags.entity";
import {BaseModel} from "@/core/base-model";

@Entity('newsTags')
export class NewsTagsEntity extends BaseModel{
  @PrimaryColumn()
  newsId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => NewsEntity, (news) => news.newsTags)
  @JoinColumn({ name: 'newsId' })
  news: Relation<NewsTagsEntity>;

  @ManyToOne(() => Tags, (tag) => tag.newsTags)
  @JoinColumn({ name: 'tagId' })
  tag: Relation<Tags>;
}
