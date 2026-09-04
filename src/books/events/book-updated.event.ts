export class BookUpdatedEvent {
  constructor(
    public readonly bookId: number,
    public readonly title: string,
    public readonly author: string,
  ) {}
}