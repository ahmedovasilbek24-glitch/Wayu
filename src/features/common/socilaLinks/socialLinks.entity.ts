import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity('social-links')
export class SocialLinksEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string;

    @Column({type: "varchar", length: 128})
    icon!: string;

    @Column({type: "varchar", length: 128})
    link!: string
}