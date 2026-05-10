import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import type {Relation} from "typeorm";
import {Tags} from "@/features/common/tags/tags.entity";

@Entity('faqsTags')
export class FaqsTagsEntity extends BaseModel{
  @PrimaryColumn()
  faqsId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => Tags, (tag) => tag.faqsTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tag: Relation<Tags>;
}
