import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteInstagramPostCommand} from "@/features/network/instagram-posts/admin/command/delete-instagram-post/delete-instagrma-post.command";
import {InstagramPostsEntity} from "@/features/network/instagram-posts/instagramPosts.entity";

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
  async execute(cmd: DeleteInstagramPostCommand): Promise<void> {
    const post = await InstagramPostsEntity.findOneBy({id: cmd.id});

    if (!post)
      throw new NotFoundException("Instagram post with given id not found");

    await InstagramPostsEntity.delete(cmd.id);
  }
}