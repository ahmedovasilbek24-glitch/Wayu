import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteQuestionCommand} from "@/features/support/questions/admin/command/delete-question/delete-question.command";
import {QuestionsEntity} from "@/features/support/questions/questions.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
  async execute(cmd: DeleteQuestionCommand): Promise<void> {
    const question = await QuestionsEntity.findOneBy({id: cmd.id});

    if (!question)
      throw new NotFoundException("Question with given id not found");

    await QuestionsEntity.delete(cmd.id);
  }
}