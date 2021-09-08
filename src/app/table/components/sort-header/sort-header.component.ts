import { Component, HostListener, OnInit } from '@angular/core';
import {
  ColumnDefDirective,
  SortDirective
} from "../../directives";
import {
  ESortDestination,
  SortEvent,
  TSortDestination
} from "../../models";


@Component({
  selector: '[app-sort-header]',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {
  private _currentSort: SortEvent = null;

  get isSortBySelf(): boolean {
    return this._currentSort?.columnId === this.columnDef.appColumnDef;
  }

  get isSortAsc(): boolean {
    return this._currentSort?.destination === ESortDestination.asc;
  }

  get isSortDesc(): boolean {
    return this._currentSort?.destination === ESortDestination.desc;
  }

  constructor(
    private sort: SortDirective,
    private columnDef: ColumnDefDirective
  ) { }

  ngOnInit(): void {
    this.subscribeToSortEvent();
  }

  private subscribeToSortEvent(): void {
    this.sort.sortChange.subscribe(sortEvent => {
      this._currentSort = sortEvent;
    });
  }

  @HostListener('click')
  private clickHandler(): void {
    const nextDestination = this.getNextSortDestination();

    this.sort.changeSort({
      columnId: this.columnDef.appColumnDef,
      destination: nextDestination
    })
  }

  private getNextSortDestination(): TSortDestination {
    if (!this.isSortBySelf || !this._currentSort) { return ESortDestination.asc }
    switch (this._currentSort?.destination) {
      case null:
        return ESortDestination.asc;
      case ESortDestination.asc:
        return ESortDestination.desc;
      case ESortDestination.desc:
        return null;
    }
  }

}
