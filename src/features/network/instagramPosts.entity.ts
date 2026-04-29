import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity('instagram-post')
export class InstagramPostsEntity extends BaseModel {
    @Column({type: "varchar", length: 256})
    image!: string;

    @Column({type: "varchar", length: 128})
    link!: string
}