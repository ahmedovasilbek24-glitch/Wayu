import {Command} from "@nestjs/cqrs";
import {UpdateStaticInfoResponse} from "@/features/common/staticInfo/commands/update-static-info/update-static-info.response";

export class UpdateStaticInfoCommand extends Command<UpdateStaticInfoResponse> {
  constructor(
    public id: number,
    public aboutUs?: string,
    public appStoreLink?: string,
    public playMarketLink?: string,
  ) {
    super();
  }
}