import { NotFoundException } from '@nestjs/common';

export function getOrThrow<T>(
  map: Map<string, T>,
  id: string,
  notFoundMsg = 'Object not found',
): T {
  const item = map.get(id);
  if (!item) {
    throw new NotFoundException(notFoundMsg);
  }
  return item;
}
