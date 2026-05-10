import {Command} from "@nestjs/cqrs";

export class DeleteFaqsCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}