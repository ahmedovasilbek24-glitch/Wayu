import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateFaqsCommand} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.command";
import {CreateFaqsResponse} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.response";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@CommandHandler(CreateFaqsCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqsCommand> {
  async execute(command: CreateFaqsCommand): Promise<CreateFaqsResponse> {
    const faq = {question: command.question, answer: command.answer} as FaqsEntity;
    await FaqsEntity.save(faq);
    return plainToInstance(CreateFaqsResponse, faq, {excludeExtraneousValues: true});
  }
}