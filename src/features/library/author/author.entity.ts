import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import {BooksEntity} from "@/features/library/book/books.entity";

@Entity('author')
export class AuthorEntity extends BaseModel {
  @Column({type: "varchar", length: 64})
  fullName!: string

  @OneToMany(() => BooksEntity, (book) => book.book)
  book?: BooksEntity[];
}