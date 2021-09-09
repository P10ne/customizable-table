import { SortDirective } from "../directives";
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from "rxjs";
import { SortEvent } from "./SortEvent";
import { map } from "rxjs/operators";

export class TableDataSource<T> {
  private _initialData: T[] = [];

  private sortState: SortEvent = null;

  private _data = new BehaviorSubject<T[]>([]);

  get data(): Observable<T[]> {
    return this._data.pipe(
      this.sort()
    );
  }

  set sorting(sortDirective: SortDirective) {
    sortDirective.sortChange.subscribe(sortEvent => {
      this.sortState = sortEvent;
      this.emitData();
    })
  }

  constructor(data: T[]) {
    this._initialData = data.slice();
    this.emitData();
  }

  private emitData(): void {
    this._data.next(this._initialData);
  }

  private sort(): MonoTypeOperatorFunction<any[]> {
    return source => source.pipe(
      map(data => {
        if (!this.sortState) return data;
        const result = data.slice().sort((a, b) => {
          if (a[this.sortState!.columnId] < b[this.sortState!.columnId]) return -this.sortState!.destination!;
          if (a[this.sortState!.columnId] > b[this.sortState!.columnId]) return this.sortState!.destination!;
          return 0;
        });
        return result;
      })
    )
  }
}
