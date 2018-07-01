import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphasort',
  pure: true,
})
export class AlphasortPipe implements PipeTransform {
  transform(values: any[], discriminator: string) {
    return values.sort(
      (a, b) =>
        a[discriminator] > b[discriminator]
          ? 1
          : a[discriminator] < b[discriminator]
            ? -1
            : 0,
    );
  }
}
