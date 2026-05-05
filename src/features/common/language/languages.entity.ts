import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity('language')
export class LanguagesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string;
}