import { SortDirective } from "../directives";
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from "rxjs";
import { SortEvent } from "./SortEvent";
import { map, publish } from "rxjs/operators";
import { PaginationComponent } from "../../pagination/components/pagination/pagination.component";
import { PaginationChangeEvent } from "../../pagination/models/PaginationChangeEvent";

type TDataSourceSortState = SortEvent;
type TDataSourcePaginationState = PaginationChangeEvent;
type TDataSourceData<T> = T[];

export interface IDataSourceInfo<T> {
  sort?: TDataSourceSortState;
  pagination?: TDataSourcePaginationState;
  data: TDataSourceData<T>;
  totalCount: number;
}

export class TableDataSource<T> {
  private _initialData: IDataSourceInfo<T> = { data: [], totalCount: 0 };

  private _sortState: SortEvent = null;

  private _paginationState: PaginationChangeEvent | null = null;

  private _stream$ = new BehaviorSubject<IDataSourceInfo<T>>({data: [], totalCount: 0});

  private _connectableData = publish<IDataSourceInfo<T>>()(this._stream$);

  get stream$(): Observable<IDataSourceInfo<T>> {
    return this._connectableData.pipe(
      this.sort(),
      this.paginate()
    );
  }

  set sorting(sortDirective: SortDirective) {
    sortDirective.sortChange.subscribe(sortEvent => {
      this._sortState = sortEvent;
      this.emitData();
    })
  }

  set pagination(paginationComponent: PaginationComponent) {
    paginationComponent.change.subscribe(paginationEvent => {
      this._paginationState = paginationEvent;
      this.emitData();
    })
  }

  constructor(data: T[]) {
    this._initialData = { data, totalCount: data.length };
    this.emitData();
  }

  private emitData(): void {
    this._stream$.next(this._initialData);
  }

  private sort(): MonoTypeOperatorFunction<IDataSourceInfo<T>> {
    return source => source.pipe(
      map(data => {
        if (!this._sortState) {
          return data;
        }
        return {
          ...data,
          sort: this._sortState,
          data: data.data.slice().sort((a, b) => {
            // @ts-ignore
            if (a[this._sortState!.columnId] < b[this._sortState!.columnId]) return -this._sortState!.destination!;
            // @ts-ignore
            if (a[this._sortState!.columnId] > b[this._sortState!.columnId]) return this._sortState!.destination!;
            return 0;
          })
        }
      })
    )
  }

  private paginate(): MonoTypeOperatorFunction<IDataSourceInfo<T>> {
    return source => source.pipe(
      map(data => {
        if (!this._paginationState) {
          return data;
        }

        const {currentPage, perPage} = this._paginationState;
        const firstItem = perPage * (currentPage - 1);
        const lastItem = perPage * currentPage;

        return {
          ...data,
          pagination: this._paginationState,
          data: data.data.slice(firstItem, lastItem)
        }
      })
    )
  }

  connect(): void {
    this._connectableData.connect();
  }
}
