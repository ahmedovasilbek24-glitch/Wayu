import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateFaqsCommand} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.command";
import {UpdateFaqsResponse} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.response";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@CommandHandler(UpdateFaqsCommand)
export class UpdateFaqsHandler implements ICommandHandler<UpdateFaqsCommand> {
  async execute(command: UpdateFaqsCommand): Promise<UpdateFaqsResponse> {
    const faq = await FaqsEntity.findOneBy({id: command.id});

    if (!faq)
      throw new NotFoundException("FAQ with given id not found");

    if (command.question !== undefined)
      faq.question = command.question;

    if (command.answer !== undefined)
      faq.answer = command.answer;

    await FaqsEntity.save(faq);
    return plainToInstance(UpdateFaqsResponse, faq, {excludeExtraneousValues: true});
  }
}