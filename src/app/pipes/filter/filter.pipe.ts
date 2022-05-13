import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: string, field: string): any {
        if (!items || !filter) {
            return items;
        }

        filter = filter.toString()

        return items.filter(item => item[field].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}