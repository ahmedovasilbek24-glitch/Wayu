import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllInstagramPostsPublicQuery} from "@/features/network/instagram-posts/public/query/get-all-instagram-post/get-all-instagram-post.public.query";
import {GetAllInstagramPostsPublicResponse} from "@/features/network/instagram-posts/public/query/get-all-instagram-post/get-all-instagram-post.public.response";
import {InstagramPostsEntity} from "@/features/network/instagram-posts/instagramPosts.entity";

@QueryHandler(GetAllInstagramPostsPublicQuery)
export class GetAllInstagramPostsPublicHandler implements IQueryHandler<GetAllInstagramPostsPublicQuery>{
  async execute(query: GetAllInstagramPostsPublicQuery): Promise<GetAllInstagramPostsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const instagramPosts = await InstagramPostsEntity.find({
      take,
      skip,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllInstagramPostsPublicResponse, instagramPosts, {excludeExtraneousValues: true});
  }
}