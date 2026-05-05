import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity('useFull-links')
export class UseFullLinksEntity extends BaseModel {
    @Column({type: "varchar", length: 128})
    title!: string;

    @Column({type: "varchar", length: 128})
    icon!: string;

    @Column({type: "varchar", length: 128})
    link!: string
}