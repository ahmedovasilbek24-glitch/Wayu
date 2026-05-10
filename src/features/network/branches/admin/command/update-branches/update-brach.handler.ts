import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BranchesEntity} from "@/features/network/branches/branches.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateBranchCommand} from "@/features/network/branches/admin/command/update-branches/update-brach.command";
import {UpdateBranchResponse} from "@/features/network/branches/admin/command/update-branches/update-brach.response";

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
  async execute(command: UpdateBranchCommand): Promise<UpdateBranchResponse> {
    const branch = await BranchesEntity.findOneBy({id: command.id});

    if (!branch)
      throw new NotFoundException("Branch with given id not found");

    if (command.countryId !== undefined)
      branch.countryId = command.countryId;

    if (command.representativeId !== undefined)
      branch.representativeId = command.representativeId;

    if (command.city !== undefined)
      branch.city = command.city;

    if (command.latitude !== undefined)
      branch.latitude = command.latitude;

    if (command.longitude !== undefined)
      branch.longitude = command.longitude;

    if (command.phoneNumber !== undefined)
      branch.phoneNumber = command.phoneNumber;

    await BranchesEntity.save(branch);
    return plainToInstance(UpdateBranchResponse, branch, {excludeExtraneousValues: true});
  }
}