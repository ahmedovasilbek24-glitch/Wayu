import {BaseModel} from "@/core/base-model";
import {Column, OneToMany} from "typeorm";
import {BranchesEntity} from "@/features/network/branches/branches.entity";

export class RepresentativesEntity extends BaseModel {
  @Column({type: 'varchar', length: 64})
  fullName!: string;

  @Column({type: 'varchar', length: 128})
  image!: string;

  @Column({type: 'varchar', length: 64})
  email!: string;

  @Column({type: 'varchar', length: 16})
  phoneNumber!: string;

  @Column({type: 'text'})
  resume!: string;

  @OneToMany(() => BranchesEntity, (branch) => branch.representative, {onDelete: "RESTRICT"})
  branch?: BranchesEntity[];
}