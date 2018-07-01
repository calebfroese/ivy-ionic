import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({ name: 'dayjs', pure: true })
export class DayPipe implements PipeTransform {
  public day = dayjs;

  transform(
    value: Date | any | Array<string | number | any | Date>,
    functionName: string,
    ...args: any[]
  ): any {
    if (!value) return value;
    if (!functionName) return value;

    let dayInstance: any = this.day(value);
    return dayInstance[functionName](...args);
  }
}
