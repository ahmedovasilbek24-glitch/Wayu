import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import type {Relation} from "typeorm";
import {Tags} from "@/features/common/tags.entity";
import {FaqsEntity} from "@/features/support/faqs.entity";

@Entity('faqsTags')
export class FaqsTagsEntity extends BaseModel{
  @PrimaryColumn()
  faqsId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => FaqsEntity, (faq) => faq.faqsTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faqsId' })
  faq: Relation<FaqsEntity>;

  @ManyToOne(() => Tags, (tag) => tag.faqsTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tag: Relation<Tags>;
}
