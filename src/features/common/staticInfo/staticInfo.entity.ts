import {BaseModel} from "../../../core/base-model";
import {Column, Entity} from "typeorm";

@Entity('static-info')
export class StaticInfoEntity extends BaseModel {
    @Column({ type: "varchar", length: 128 })
    appStoreLink?: string;

    @Column({ type: "varchar", length: 128})
    playMarketLink?: string;

    @Column({ type: "text" })
    aboutUs!: string;
}