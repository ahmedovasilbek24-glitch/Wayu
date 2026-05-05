import {Command} from "@nestjs/cqrs";
import {CreateUsefulLinkResponse} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.response";

export class CreateUsefulLinkCommand extends Command<CreateUsefulLinkResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}