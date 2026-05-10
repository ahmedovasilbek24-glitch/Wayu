import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";
import {DeleteEventCategoryCommand} from "@/features/events/events-category/command/delete-event-category/delete-event-category.command";

@CommandHandler(DeleteEventCategoryCommand)
export class DeleteEventCategoryHandler implements ICommandHandler<DeleteEventCategoryCommand> {
  async execute(cmd: DeleteEventCategoryCommand): Promise<void> {
    const category = await EventCategoriesEntity.findOneBy({id: cmd.id});

    if (!category)
      throw new NotFoundException("Event category with given id not found");

    await EventCategoriesEntity.delete(cmd.id);
  }
}