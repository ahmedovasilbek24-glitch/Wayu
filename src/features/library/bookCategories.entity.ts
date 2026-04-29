import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import {BooksEntity} from "@/features/library/books.entity";
import type{Relation} from "typeorm";

@Entity('book-category')
export class BookCategoriesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string

    @OneToMany(() => BooksEntity,book => book.category)
    book? : Relation<BooksEntity>
}