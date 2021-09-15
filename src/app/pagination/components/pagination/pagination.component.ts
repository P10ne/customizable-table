import { Attribute, Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PaginationChangeEvent } from "../../models/PaginationChangeEvent";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input()
  perPage: number = 5;

  @Input()
  perPageOptions: number[] = [5, 10, 15];

  @Input()
  currentPage: number = 1;

  @Input()
  itemsCount: number = 0;

  @Output()
  change = new BehaviorSubject<PaginationChangeEvent | null>(null);

  get isPrevBtnDisabled(): boolean {
    return this.currentPage <= 1;
  }

  get isNextBtnDisabled(): boolean {
    return this.currentPage >= Math.ceil(this.itemsCount / this.perPage);
  }

  constructor() { }

  ngOnInit(): void {
    this.emitChanges();
  }

  next(): void {
    this.currentPage++;
    this.emitChanges();
  }

  prev(): void {
    this.currentPage--;
    this.emitChanges();
  }

  emitChanges(): void {
    this.change.next({page: this.currentPage, itemsPerPage: this.perPage});
  }

}
