import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateInstagramPostCommand} from "@/features/network/instagram-posts/admin/command/update-instagram-post/update-instagrma-post.command";
import {UpdateInstagramPostResponse} from "@/features/network/instagram-posts/admin/command/update-instagram-post/update-instagrma-post.response";
import {InstagramPostsEntity} from "@/features/network/instagram-posts/instagramPosts.entity";

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
  async execute(command: UpdateInstagramPostCommand): Promise<UpdateInstagramPostResponse> {
    const post = await InstagramPostsEntity.findOneBy({id: command.id});

    if (!post)
      throw new NotFoundException("Instagram post with given id not found");

    if (command.image !== undefined)
      post.image = command.image.path;
    if (command.link !== undefined)
      post.link = command.link;

    await InstagramPostsEntity.save(post);
    return plainToInstance(UpdateInstagramPostResponse, post, {excludeExtraneousValues: true});
  }
}