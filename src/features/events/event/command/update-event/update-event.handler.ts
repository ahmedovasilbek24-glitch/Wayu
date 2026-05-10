import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateEventCommand} from "@/features/events/event/command/update-event/update-event.command";
import {UpdateEventResponse} from "@/features/events/event/command/update-event/update-event.response";
import {EventsEntity} from "@/features/events/event/events.entity";

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  async execute(command: UpdateEventCommand): Promise<UpdateEventResponse> {
    const event = await EventsEntity.findOneBy({id: command.id});
    if (!event)
      throw new NotFoundException("Event with given id not found");

    if (command.categoryId !== undefined)
      event.categoryId = command.categoryId;

    if (command.title !== undefined)
      event.title = command.title;

    if (command.image !== undefined)
      event.image = command.image.path;

    if (command.date !== undefined)
      event.date = command.date;

    if (command.content !== undefined)
      event.content = command.content;

    await EventsEntity.save(event);
    return plainToInstance(UpdateEventResponse, event, {excludeExtraneousValues: true});
  }
}