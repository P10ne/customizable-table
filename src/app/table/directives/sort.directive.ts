import { Directive, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {
  HeaderSortEvent,
  SortEvent
} from "../models";

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Input()
  set defaultSort(v: HeaderSortEvent) {
    this.changeSort(v);
  }

  private _sortChange = new BehaviorSubject<SortEvent>(null);

  @Output()
  get sortChange(): Observable<SortEvent> {
    return this._sortChange.pipe();
  }

  constructor() { }

  public changeSort(data: HeaderSortEvent): void {
    if (data.destination) {
      this._sortChange.next(data);
    } else {
      this._sortChange.next(null);
    }
  }

}
