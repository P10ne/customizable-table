import { BehaviorSubject, Observable } from "rxjs";

export class TableDataSource<T> {
  private _initialData: T[] = [];

  private _data = new BehaviorSubject<T[]>([]);

  get data(): Observable<T[]> {
    return this._data.pipe();
  }

  constructor(data: T[]) {
    this._initialData = data.slice();
    this.emitData();
  }

  private emitData(): void {
    this._data.next(this._initialData);
  }
}
