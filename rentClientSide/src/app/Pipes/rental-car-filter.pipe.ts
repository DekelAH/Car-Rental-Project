import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'rentalCarFilter'
})

export class RentalCarFilterPipe implements PipeTransform {

  // Free search pipe - used in vehicle component
  transform(values: any, searchName: any, isAnd: boolean): any {

    if (searchName && Array.isArray(values)) {

      let filterKeys = Object.keys(searchName);
      if (isAnd) {

        return values.filter(value => filterKeys.reduce((memo, keyName) =>
          (memo && new RegExp(searchName[keyName], 'gi').test(value[keyName])) || searchName[keyName] === "", true));

      } else {

        return values.filter(value => {
          return filterKeys.some((keyName) => {

            console.log(keyName);
            return new RegExp(searchName[keyName], 'gi').test(value[keyName]) || searchName[keyName] === "";
          });
        });
      }
    } else {

      return values;
    }
  }
}