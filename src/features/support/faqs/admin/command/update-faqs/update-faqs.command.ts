import {Command} from "@nestjs/cqrs";
import {UpdateFaqsResponse} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.response";

export class UpdateFaqsCommand extends Command<UpdateFaqsResponse> {
  constructor(
    public id: number,
    public question?: string,
    public answer?: string,
  ) {
    super();
  }
}