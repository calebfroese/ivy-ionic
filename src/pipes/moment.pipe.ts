import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment', pure: true })
export class MomentPipe implements PipeTransform {
  public day = moment;

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
