import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneQuestionResponse} from "@/features/support/questions/admin/query/get-one-question/get-one-question.response";
import {QuestionsEntity} from "@/features/support/questions/questions.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneQuestionQuery} from "@/features/support/questions/admin/query/get-one-question/get-one-question.query";

@QueryHandler(GetOneQuestionQuery)
export class GetOneQuestionHandler implements IQueryHandler<GetOneQuestionQuery> {
  async execute(query: GetOneQuestionQuery): Promise<GetOneQuestionResponse> {
    const question = await QuestionsEntity.findOneBy({id: query.id});

    if (!question)
      throw new NotFoundException("Question with given id not found");

    return plainToInstance(GetOneQuestionResponse, question, {excludeExtraneousValues: true});
  }
}