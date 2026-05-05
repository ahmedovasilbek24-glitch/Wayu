import {Command} from "@nestjs/cqrs";
import {UpdateUseFullLinkResponse} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.response";

export class UpdateUsefulLinkCommand extends Command<UpdateUseFullLinkResponse> {
  constructor(
    public id?: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}