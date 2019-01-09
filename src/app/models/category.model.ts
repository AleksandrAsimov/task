export interface CategoryData {
    id: number;
    name: string;
}

export class Category {
    id: number;
    name: string;
    status = false;
    constructor(ctg: CategoryData) {
        this.id = ctg.id;
        this.name = ctg.name;
    }
}
