import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBranchCommand} from "./create-branch.command";
import {CreateBranchResponse} from "./create-branch.response";
import {BranchesEntity} from "@/features/network/branches/branches.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CountriesEntity} from "@/features/common/counties/countries.entity";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  async execute(command: CreateBranchCommand): Promise<CreateBranchResponse> {
    const countryExists = await CountriesEntity.existsBy({id: command.countryId});

    if (!countryExists)
      throw new NotFoundException("Country with given id not found");

    const representativeExists = await RepresentativesEntity.existsBy({id: command.representativeId});
    if (!representativeExists)
      throw new NotFoundException("Representative with given id not found");

    const branch = BranchesEntity.create({
      countryId: command.countryId,
      representativeId: command.representativeId,
      city: command.city,
      latitude: command.latitude,
      longitude: command.longitude,
      phoneNumber: command.phoneNumber,
    }) as BranchesEntity;

    await BranchesEntity.save(branch);
    return plainToInstance(CreateBranchResponse, branch, {excludeExtraneousValues: true});
  }
}