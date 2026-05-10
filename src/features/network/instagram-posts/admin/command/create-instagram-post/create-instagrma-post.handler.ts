import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateInstagramPostCommand} from "@/features/network/instagram-posts/admin/command/create-instagram-post/create-instagrma-post.command";
import {CreateInstagramPostResponse} from "@/features/network/instagram-posts/admin/command/create-instagram-post/create-instagrma-post.response";
import {InstagramPostsEntity} from "@/features/network/instagram-posts/instagramPosts.entity";

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
  async execute(command: CreateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
    const post = {
      image: command.image.path,
      link: command.link,
    } as InstagramPostsEntity;
    await InstagramPostsEntity.save(post);
    return plainToInstance(CreateInstagramPostResponse, post, {excludeExtraneousValues: true});
  }
}