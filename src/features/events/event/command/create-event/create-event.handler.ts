import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer"
import {CreateEventResponse} from "@/features/events/event/command/create-event/create-event.response";
import {CreateEventCommand} from "@/features/events/event/command/create-event/create-event.command";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";
import {EventsEntity} from "@/features/events/event/events.entity";

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  async execute(command: CreateEventCommand): Promise<CreateEventResponse> {
    const categoryExists = await EventCategoriesEntity.existsBy({id: command.categoryId});
    if (!categoryExists) throw new NotFoundException("Event category with given id not found");

    const event = EventsEntity.create({
      categoryId: command.categoryId,
      title: command.title,
      image: command.image.path,
      date: command.date,
      content: command.content,
    });

    await EventsEntity.save(event);
    return plainToInstance(CreateEventResponse, event, {excludeExtraneousValues: true});
  }
}