import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneInstagramPostResponse} from "./get-one-instagram-post.response";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneInstagramPostQuery} from "@/features/network/instagram-posts/admin/query/get-one-instagram-post/get-one-instagram-post.handler";
import {InstagramPostsEntity} from "@/features/network/instagram-posts/instagramPosts.entity";

@QueryHandler(GetOneInstagramPostQuery)
export class GetOneInstagramPostHandler implements IQueryHandler<GetOneInstagramPostQuery> {
  async execute(query: GetOneInstagramPostQuery): Promise<GetOneInstagramPostResponse> {
    const post = await InstagramPostsEntity.findOneBy({id: query.id});

    if (!post)
      throw new NotFoundException("Instagram post with given id not found");

    return plainToInstance(GetOneInstagramPostResponse, post, {excludeExtraneousValues: true});
  }
}