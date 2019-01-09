import { CategoryData } from './category.model';
import { CityData } from './city.model';

export interface Data {
    id: number;
    name: string;
    city: number;
    category: number;
    price: number;
}

export class Item {
    id: number;
    name: string;
    city: CityData;
    category: CategoryData;
    price: number;
    constructor(item: Data, categories: CategoryData[], cities: CityData[]) {
        this.id = item.id;
        this.name = item.name;
        this.price = item.price;
        categories.forEach((cat) => {
            if (cat.id === item.category) {
                this.category = cat;
            }
        });
        cities.forEach((city) => {
            if (city.id === item.city) {
                this.city = city;
            }
        });
    }
}
