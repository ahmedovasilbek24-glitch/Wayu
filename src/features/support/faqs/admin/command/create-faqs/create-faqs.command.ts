import {Command} from "@nestjs/cqrs";
import {CreateFaqsResponse} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.response";

export class CreateFaqsCommand extends Command<CreateFaqsResponse> {
  constructor(
    public question: string,
    public answer: string,
  ) {
    super();
  }
}