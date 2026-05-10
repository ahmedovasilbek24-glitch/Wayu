import {BaseModel} from "@/core/base-model";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {AuthorEntity} from "../author/author.entity";
import type {Relation} from "typeorm";
import {BookCategoriesEntity} from "../book-category/bookCategories.entity";

@Entity('books')
export class BooksEntity extends BaseModel {
  @Column()
  authorId!: number

  @ManyToOne(() => AuthorEntity, (author) => author.id)
  author!: Relation<AuthorEntity>;

  @Column()
  categoryId!: number;

  @OneToMany(() => BookCategoriesEntity, (category) => category.book)
  category!: Relation<BookCategoriesEntity>;

  @Column({type: "varchar", length: 256})
  title!: string;

  @Column({type: "varchar", length: 128})
  image!: string;

  @Column({type: "text"})
  description?: string

  @Column({type: "varchar", length: 256})
  file!: string;

  @Column()
  pages!: number;

  @Column()
  year!: number;

  @ManyToOne(() => AuthorEntity, (author) => author.book)
  book?: Relation<AuthorEntity>;
}