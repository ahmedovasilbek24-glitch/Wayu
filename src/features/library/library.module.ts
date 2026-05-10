import {Module} from "@nestjs/common";
import {AuthorController} from "@/features/library/author/author.controller";
import {BookController} from "@/features/library/book/book.controller";
import {CreateAuthorHandler} from "@/features/library/author/command/create-author/create-author.handler";
import {UpdateAuthorHandler} from "@/features/library/author/command/update-author/update-author.handler";
import {DeleteAuthorHandler} from "@/features/library/author/command/delete-author/delete-author.handler";
import {GetAllAuthorHandler} from "@/features/library/author/query/get-all-author/get-all-author.handler";
import {GetOneAuthorHandler} from "@/features/library/author/query/get-one-author/get-one-author.handler";
import {CreateBookHandler} from "@/features/library/book/command/create-book/create-book.handler";
import {UpdateBookHandler} from "@/features/library/book/command/update-book/update-book.handler";
import {DeleteBookHandler} from "@/features/library/book/command/delete-book/delete-book.handler";
import {GetAllBookHandler} from "@/features/library/book/query/get-all-book/get-all-book.handler";
import {GetOneBookHandler} from "@/features/library/book/query/get-one-book/get-one-book.handler";
import {CreateBookCategoryHandler} from "@/features/library/book-category/command/create-book-category/create-book-category.handler";
import {UpdateBookCategoryHandler} from "@/features/library/book-category/command/update-book-category/update-book-category.handler";
import {DeleteBookCategoryHandler} from "@/features/library/book-category/command/delete-book-category/delete-book-category.handler";
import {GetAllBookCategoryHandler} from "@/features/library/book-category/query/get-all-book-category/get-all-book-category.handler";
import {GetOneBookCategoryHandler} from "@/features/library/book-category/query/get-one-book-category/get-one-book-category.handler";
import {BookCategoryController} from "@/features/library/book-category/book-category.controller";

@Module({
  controllers: [
    AuthorController,
    BookCategoryController,
    BookController,
  ],
  providers: [
    CreateAuthorHandler,
    UpdateAuthorHandler,
    DeleteAuthorHandler,
    GetAllAuthorHandler,
    GetOneAuthorHandler,

    CreateBookCategoryHandler,
    UpdateBookCategoryHandler,
    DeleteBookCategoryHandler,
    GetAllBookCategoryHandler,
    GetOneBookCategoryHandler,

    CreateBookHandler,
    UpdateBookHandler,
    DeleteBookHandler,
    GetAllBookHandler,
    GetOneBookHandler,

    // GetAllAuthorPublicHandler,
    // GetOneAuthorPublicHandler,
    // GetAllBookCategoryPublicHandler,
    // GetOneBookCategoryPublicHandler,
    // GetAllBookPublicHandler,
    // GetOneBookPublicHandler,
  ]
})
export class LibraryModule {
}