import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteEventCommand} from "@/features/events/event/command/delete-event/delete-event.command";
import {EventsEntity} from "@/features/events/event/events.entity";

@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
  async execute(cmd: DeleteEventCommand): Promise<void> {
    const event = await EventsEntity.findOneBy({id: cmd.id});

    if (!event)
      throw new NotFoundException("Event with given id not found");

    await EventsEntity.delete(cmd.id);
  }
}