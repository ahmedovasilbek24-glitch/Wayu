import {Query} from "@nestjs/cqrs";
import {GetAllInstagramPostsPublicResponse} from "@/features/network/instagram-posts/public/query/get-all-instagram-post/get-all-instagram-post.public.response";
import {GetAllInstagramPostsPublicFilters} from "@/features/network/instagram-posts/public/query/get-all-instagram-post/get-all-instagram-post.public.filters";

export class GetAllInstagramPostsPublicQuery extends Query<GetAllInstagramPostsPublicResponse[]>{
  constructor(public readonly filters: GetAllInstagramPostsPublicFilters) {
    super();
  }
}