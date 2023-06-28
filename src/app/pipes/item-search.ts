import { Injectable, Pipe, PipeTransform } from '@angular/core';

    
@Pipe({
    name: 'itemSearch'
})
@Injectable()
export class ItemSearchPipe implements PipeTransform {
    transform(items: any[], term:string): any {
        
        if (!term){
            return items;
        }
        
        let returnItems = items.filter(
        (item) => {
            let name = item.name.toLowerCase();
            return name.indexOf(term.toLowerCase()) !== -1;
            
        }
        );

        return returnItems;
    }
}