import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateStaticInfoCommand} from "@/features/common/staticInfo/commands/update-static-info/update-static-info.command";
import {UpdateStaticInfoResponse} from "@/features/common/staticInfo/commands/update-static-info/update-static-info.response";
import {StaticInfoEntity} from "@/features/common/staticInfo/staticInfo.entity";

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  async execute(command: UpdateStaticInfoCommand): Promise<UpdateStaticInfoResponse> {
    const staticInfo = await StaticInfoEntity.findOneBy({id: command.id});

    if (!staticInfo)
      throw new NotFoundException("Static info with given id not found");

    if (command.aboutUs !== undefined)
      staticInfo.aboutUs = command.aboutUs;
    if (command.appStoreLink !== undefined)
      staticInfo.appStoreLink = command.appStoreLink;
    if (command.playMarketLink !== undefined)
      staticInfo.playMarketLink = command.playMarketLink;

    await StaticInfoEntity.save(staticInfo);
    return plainToInstance(UpdateStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}