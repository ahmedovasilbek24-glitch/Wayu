import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateQuestionCommand} from "@/features/support/questions/admin/command/create-question/create-question.command";
import {CreateQuestionResponse} from "@/features/support/questions/admin/command/create-question/create-question.response";
import {plainToInstance} from "class-transformer";
import {QuestionsStatus} from "@/core/enum/enum";
import {QuestionsEntity} from "@/features/support/questions/questions.entity";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
  async execute(command: CreateQuestionCommand): Promise<CreateQuestionResponse> {
    const question = QuestionsEntity.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      questions: command.questions,
      status: QuestionsStatus.PENDING,
    }) as QuestionsEntity;
    await QuestionsEntity.save(question);
    return plainToInstance(CreateQuestionResponse, question, {excludeExtraneousValues: true});
  }
}