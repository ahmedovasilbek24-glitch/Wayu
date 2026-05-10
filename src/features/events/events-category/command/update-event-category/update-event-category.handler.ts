import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateEventCategoryCommand} from "@/features/events/events-category/command/update-event-category/update-event-category.command";
import {UpdateEventCategoryResponse} from "@/features/events/events-category/command/update-event-category/update-event-category.response";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";

@CommandHandler(UpdateEventCategoryCommand)
export class UpdateEventCategoryHandler implements ICommandHandler<UpdateEventCategoryCommand> {
  async execute(command: UpdateEventCategoryCommand): Promise<UpdateEventCategoryResponse> {
    const category = await EventCategoriesEntity.findOneBy({id: command.id});

    if (!category)
      throw new NotFoundException("Event category with given id not found");

    if (command.title !== undefined)
      category.title = command.title;

    await EventCategoriesEntity.save(category);
    return plainToInstance(UpdateEventCategoryResponse, category, {excludeExtraneousValues: true});
  }
}