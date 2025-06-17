import { NotFoundException } from '@nestjs/common';
import { Favs } from '../favs/entities/favs.entity';

export function favsEnsureHas(
  map: Favs,
  id: string,
  entity_name: string,
  notFoundMsg = "Element isn't found",
): void {
  const item = map.has(id, entity_name);
  if (!item) {
    throw new NotFoundException(notFoundMsg);
  }
}
