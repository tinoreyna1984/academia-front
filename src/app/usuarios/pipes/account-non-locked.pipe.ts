import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountNonLocked'
})
export class AccountNonLockedPipe implements PipeTransform {

  transform(accountNonLocked: boolean): unknown {
    return accountNonLocked ? "Sí" : "No";
  }

}
