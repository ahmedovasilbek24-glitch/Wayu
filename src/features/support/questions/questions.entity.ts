import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";
import {QuestionsStatus} from "@/core/enum/enum";

@Entity('questions')
export class QuestionsEntity extends BaseModel {
  @Column({type: 'varchar', length: 64})
  fullName!: string;

  @Column({type: 'varchar', length: 16})
  phoneNumber!: string;

  @Column({type: 'varchar', length: 2000})
  questions!: string;

  @Column({type: 'enum', enum: QuestionsStatus})
  status!: QuestionsStatus;
}