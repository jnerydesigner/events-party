import { randomUUID } from "node:crypto";

export class ImagesUserEntity {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly url: string,
  ) {}
  static create(userId: string, url: string): ImagesUserEntity {
    const id = randomUUID();
    return new ImagesUserEntity(id, userId, url);
  }
}
