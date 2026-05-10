import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteFaqsCommand} from "@/features/support/faqs/admin/command/delete-faqs/delete-faqs.command";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@CommandHandler(DeleteFaqsCommand)
export class DeleteFaqHandler implements ICommandHandler<DeleteFaqsCommand> {
  async execute(command: DeleteFaqsCommand): Promise<void> {
    const exists = await FaqsEntity.existsBy({id: command.id});

    if (!exists)
      throw new NotFoundException("FAQ with given id not found");

    await FaqsEntity.delete({id: command.id});
  }
}