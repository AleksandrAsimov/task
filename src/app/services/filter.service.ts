import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  currentFilter = new BehaviorSubject<Filter>(null);
  $currentFilter = this.currentFilter.asObservable();

  constructor() { }

  changeFilter(newFilter: Filter) {
    this.currentFilter.next(newFilter);
  }
}
