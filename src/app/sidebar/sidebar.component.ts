import { Component, OnInit, ElementRef } from '@angular/core';
import { category } from '../consts/category';
import { data } from '../consts/data';
import { city } from '../consts/city';
import { Category } from '../models/category.model';
import { FilterService } from '../services/filter.service';
import { Filter } from '../models/filter.model';
import { CityData } from '../models/city.model';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Category[] = [];
  leftRoundX = 'translateX(0px)';
  rightRoundX = 'translateX(225px)';
  lineWidth = '225px';
  curRound = 'none';

  cities = city;
  currentCity: CityData;
  dropdownIsOpen = false;

  maxPrice = 0;
  minPrice = 0;
  currMaxPrice = 0;
  currMinPrice = 0;

  move = (ev) => {
    const leftR = Number(this.leftRoundX.match(/\d/g).join(''));
    const rightR = Number(this.rightRoundX.match(/\d/g).join(''));

    if (this.curRound === 'left') {
      if (ev.screenX > 56 && ev.screenX < (rightR + 41)) {
        this.leftRoundX = `translateX(${ev.screenX - 56}px)`;
      } else if (ev.screenX < 56) {
        this.leftRoundX = `translateX(0px)`;
      } else if (ev.screenX > rightR + 41) {
        this.leftRoundX = `translateX(${rightR - 16}px)`;
      }
    } else if (this.curRound === 'right') {
      if (ev.screenX > (leftR + 70) && ev.screenX < 281) {
        this.rightRoundX = `translateX(${ev.screenX - 56}px)`;
      } else if (ev.screenX < (leftR + 70)) {
        this.rightRoundX = `translateX(${(leftR + 16)}px)`;
      } else if (ev.screenX > 281) {
        this.rightRoundX = `translateX(225px)`;
      }
    }
    this.lineWidth = `${Number(this.rightRoundX.match(/\d/g).join('')) - Number(this.leftRoundX.match(/\d/g).join(''))}px`;
    this.currMinPrice = Math.round((((this.maxPrice - this.minPrice + 1) / 225) * Number(this.leftRoundX.match(/\d/g).join(''))));
    this.currMaxPrice = Math.round((((this.maxPrice - this.minPrice + 1) / 225) * Number(this.rightRoundX.match(/\d/g).join(''))));
  }


  constructor(private ref: ElementRef, private filerService: FilterService) {
    category.forEach((ctg) => {
      this.categories.push(new Category(ctg));
    });

    this.findMinMax();

  }

  ngOnInit() {
    this.removeLis();
    this.currentCity = this.cities[0];
  }

  log(s: any, round: string) {
    if (round === 'left') {
      this.leftRoundX = `translateX(${s.screenX - 56}px)`;
    }
  }

  addLis(round) {
    this.curRound = round;
    (this.ref.nativeElement as any).addEventListener('mousemove', this.move);
  }

  removeLis() {
    document.addEventListener('mouseup', () => { (this.ref.nativeElement as any).removeEventListener('mousemove', this.move); });
    this.curRound = 'none';
  }

  findMinMax() {
    this.minPrice = data[0].price;
    this.maxPrice = data[0].price;
    data.forEach((el) => {
      if (el.price < this.minPrice) {
        this.minPrice = el.price;
      }
      if (el.price > this.maxPrice) {
        this.maxPrice = el.price;
      }
    });
    this.currMaxPrice = this.maxPrice;
    this.currMinPrice = this.minPrice;
  }

  dropdownClose(cityChs?) {
    if (cityChs) {
      this.currentCity = cityChs;
    }
    this.dropdownIsOpen = false;
  }

  filter() {
    const categories = [];
    this.categories.forEach((cat) => {
      if (cat.status) {
        categories.push(cat.id);
      }
    });
    this.filerService.changeFilter(new Filter(this.currentCity.id, categories, this.currMaxPrice, this.currMinPrice));
  }
}
