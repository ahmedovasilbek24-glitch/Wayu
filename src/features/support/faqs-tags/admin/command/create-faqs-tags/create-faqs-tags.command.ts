import {Command} from "@nestjs/cqrs";
import {CreateFaqsTagsResponse} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.response";

export class CreateFaqsTagsCommand extends Command<CreateFaqsTagsResponse>{
  constructor(
    public faqsId: number,
    public tagId: number
  ) {
    super();
  }
}