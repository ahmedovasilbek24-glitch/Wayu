import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {Tags} from "@/features/common/tags/tags.entity";
import {DeleteFaqsTagsCommand} from "@/features/support/faqs-tags/admin/command/delete-faqs-tags/delete-faqs-tags.command";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@CommandHandler(DeleteFaqsTagsCommand)
export class DeleteFaqsTagHandler implements ICommandHandler<DeleteFaqsTagsCommand> {
  async execute(cmd: DeleteFaqsTagsCommand): Promise<void> {
    const faqs = await FaqsEntity.findOne({relations: ['tags'], where: {id: cmd.faqsId}});
    if (!faqs)
      throw new NotFoundException('faqs with given id not found')

    const tag = await Tags.findOneBy({id: cmd.tagId});
    if (!tag)
      throw new NotFoundException('tag with given if not found');

    faqs.tags = faqs.tags.filter(x => x.id !== tag.id);
    await FaqsEntity.save(faqs);
  }
}