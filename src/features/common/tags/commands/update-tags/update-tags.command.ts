import {Command} from "@nestjs/cqrs";
import {UpdateTagsResponse} from "@/features/common/tags/commands/update-tags/update-tags.response";

export class UpdateTagsCommand extends Command<UpdateTagsResponse> {
  constructor(
    public id?: number,
    public title?: string,
  ) {
    super();
  }
}