import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateStaticInfoCommand} from "@/features/common/staticInfo/commands/create-static-info/create-static-info.command";
import {CreateStaticInfoResponse} from "@/features/common/staticInfo/commands/create-static-info/create-static-info.response";
import {StaticInfoEntity} from "@/features/common/staticInfo/staticInfo.entity";

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(command: CreateStaticInfoCommand): Promise<CreateStaticInfoResponse> {
    const staticInfo = {
      aboutUs: command.aboutUs,
      appStoreLink: command.appStoreLink,
      playMarketLink: command.playMarketLink,
    } as StaticInfoEntity;
    await StaticInfoEntity.save(staticInfo);
    return plainToInstance(CreateStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}