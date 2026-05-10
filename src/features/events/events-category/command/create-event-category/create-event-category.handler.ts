import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException} from "@nestjs/common";
import {ILike} from "typeorm";
import {plainToInstance} from "class-transformer";
import {CreateEventCategoryCommand} from "@/features/events/events-category/command/create-event-category/create-event-category.command";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";
import {CreateEventCategoryResponse} from "@/features/events/events-category/command/create-event-category/create-event-category.response";

@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand> {
  async execute(command: CreateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
    const alreadyExists = await EventCategoriesEntity.existsBy({title: ILike(command.title)});

    if (alreadyExists)
      throw new BadRequestException("Event category already exists");

    const category = EventCategoriesEntity.create({title: command.title} as EventCategoriesEntity);
    await EventCategoriesEntity.save(category);
    return plainToInstance(CreateEventCategoryResponse, category, {excludeExtraneousValues: true});
  }
}