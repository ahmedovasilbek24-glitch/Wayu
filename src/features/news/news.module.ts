import {Module} from "@nestjs/common";
import {NewsCategoryController} from "@/features/news/news-categories/news-category.controller";
import {CreateNewsCategoryHandler} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.handler";
import {GetAllNewsCategoryHandler} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category.handler";
import {GetAllNewsHandler} from "@/features/news/news/query/get-all-news/get-all-news.handler";
import {CreateNewsHandler} from "@/features/news/news/commonds/create-news.commonds/create-news.handler";
import {NewsController} from "@/features/news/news/news.controller";
import {DeleteNewsCategoryHandler} from "@/features/news/news-categories/commonds/delete-news-category/delete-news-category.handler";
import {GetOneNewsCategoryHandler} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.handler";

@Module({
  controllers: [NewsCategoryController, NewsController],
  providers: [
    GetAllNewsCategoryHandler,
    CreateNewsCategoryHandler,
    DeleteNewsCategoryHandler,
    GetOneNewsCategoryHandler,
    GetAllNewsHandler,
    CreateNewsHandler
  ],
})

export class NewsModule {
}
