import { Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import type {Relation} from "typeorm";
import {Tags} from "@/features/common/tags.entity";
import {FaqsTagsEntity} from "@/migrations/faqsTags.entity";

@Entity('faqs')
export class FaqsEntity extends BaseModel {
  @Column({ type: 'varchar', length: 256, nullable: false })
  question!: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  answer!: string;

  @ManyToMany(() => Tags, (tag) => tag.faqs)
  tags: Relation<Tags[]>;

  @OneToMany(() => FaqsTagsEntity, (faqsTag) => faqsTag.faq)
  faqsTags: Relation<FaqsTagsEntity[]>;
}
