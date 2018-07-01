import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comparesort',
  pure: true,
})
export class CompareSortPipe implements PipeTransform {
  transform(values: any[], discriminator: string, reverse: boolean) {
    const direction = reverse ? -1 : 1;
    return values.sort(
      (a, b) =>
        a[discriminator] > b[discriminator]
          ? 1 * direction
          : a[discriminator] < b[discriminator]
            ? -1 * direction
            : 0,
    );
  }
}
