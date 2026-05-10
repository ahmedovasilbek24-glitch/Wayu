import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Tags} from "@/features/common/tags/tags.entity";
import {NotFoundException} from "@nestjs/common";
import {CreateFaqsTagsCommand} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.command";
import {CreateFaqsTagsResponse} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.response";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@CommandHandler(CreateFaqsTagsCommand)
export class CreateFaqsTagHandler implements ICommandHandler<CreateFaqsTagsCommand> {
  async execute(cmd: CreateFaqsTagsCommand): Promise<CreateFaqsTagsResponse> {
    const faqs = await FaqsEntity.findOne({where: {id: cmd.faqsId}, relations: ['tags']});
    if (!faqs)
      throw new NotFoundException("Faqs with given id not found");

    const tag = await Tags.findOneBy({id: cmd.tagId});
    if (!tag)
      throw new NotFoundException("Tag with given id not found");
    faqs.tags.push(tag);
    await FaqsEntity.save(faqs);
    return {faqsId: faqs.id, tagId: tag.id}

  }
}