import { Component } from '@angular/core';
import { data } from './consts/data';
import { city } from './consts/city';
import { category } from './consts/category';
import { Item } from './models/item.model';
import { FilterService } from './services/filter.service';
import { Filter } from './models/filter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: Item[] = [];

  constructor(private filerService: FilterService) {
    data.forEach((item) => {
      this.items.push(new Item(item, category, city));
    });
    this.filerService.$currentFilter.subscribe(res => this.filter(res));
  }

  filter(filter: Filter) {
    if (filter) {
      let newItems: Item[] = [];

      data.forEach((item) => {
        if (
          (item.price >= filter.minPrice) &&
          (item.price <= filter.maxPrice) &&
          (item.city === filter.city)
        ) {
          newItems.push(new Item(item, category, city));
        }
      });

      filter.category.forEach((cat) => {
        const newArr = [];
        newItems.forEach((item) => {
          if (item.category.id === cat) {
            newArr.push(item);
          }
        });
        newItems = newArr;
      });

      this.items = newItems;
    }
  }

}
