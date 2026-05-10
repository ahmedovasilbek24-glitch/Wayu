import {Command} from "@nestjs/cqrs";

export class DeleteFaqsTagsCommand extends Command<void>{
  constructor(
    public faqsId: number,
    public tagId: number
  ) {
    super();
  }
}