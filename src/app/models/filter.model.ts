export class Filter {
    city: number;
    category: number[];
    maxPrice: number;
    minPrice: number;
    constructor(city: number, category: number[], maxPrice: number, minPrice: number) {
        this.city = city;
        this.category = category;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }
}
