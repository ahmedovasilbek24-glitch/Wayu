import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneEventQuery} from "@/features/events/event/query/get-one-event/get-one-event.query";
import {GetOneEventResponse} from "@/features/events/event/query/get-one-event/get-one-event.response";
import {EventsEntity} from "@/features/events/event/events.entity";

@QueryHandler(GetOneEventQuery)
export class GetOneEventHandler implements IQueryHandler<GetOneEventQuery> {
  async execute(query: GetOneEventQuery): Promise<GetOneEventResponse> {
    const event = await EventsEntity.findOne({
      where: {id: query.id},
      relations: ['category'],
    });
    if (!event) throw new NotFoundException("Event with given id not found");
    return plainToInstance(GetOneEventResponse, event, {excludeExtraneousValues: true});
  }
}