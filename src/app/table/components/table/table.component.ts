import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  Injector,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ColumnDefDirective, SortDirective } from "../../directives";
import { RowComponent } from "../row/row.component";
import { TableDataSource } from "../../models/TableDataSource";
import { TTableData } from "../../models/TTableData";
import { PaginationComponent } from "../../../pagination/components/pagination/pagination.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit {
  @ContentChildren(ColumnDefDirective)
  private _columns!: QueryList<ColumnDefDirective>;

  @ViewChild('headerRow', { read: ViewContainerRef })
  private _headerRowContainer!: ViewContainerRef;

  @ViewChild('bodyRow', { read: ViewContainerRef })
  private _bodyRowContainer!: ViewContainerRef;

  @ViewChild(PaginationComponent)
  private _pagination?: PaginationComponent;

  private _dataSource?: TableDataSource<any>;

  @Input()
  set dataSource(data: TTableData<any>) {
    if (data instanceof TableDataSource) {
      this._dataSource = data;
      this.subscribeToDataSource(data);
    } else {
      this._data = data;
    }
  }

  @Input()
  usePagination: boolean = false;

  private _data: any[] = [];

  private _totalCount: number = 0;
  get totalCount(): number {
    return this._totalCount;
  }

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _sort: SortDirective
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createHeaderRow();
    this.createBodyRows();

    if (this._dataSource) {
      if (this._sort) this._dataSource.sorting = this._sort;
      if (this._pagination) this._dataSource.pagination = this._pagination;
      this._dataSource?.connect();
    }
  }

  // todo рефакторинг методов
  private createHeaderRow(): void {
    const headerCellDefTpls = this._columns.map(column => column.headerCell.template);
    const rowFactory = this._resolver.resolveComponentFactory(RowComponent);
    const rowRef = rowFactory.create(this._injector);
    rowRef.instance.cellTemplates = headerCellDefTpls;
    rowRef.hostView.detectChanges();
    this._headerRowContainer.insert(rowRef.hostView);
  }

  private createBodyRows(): void {
    const bodyCellDefTpls = this._columns.map(column => column.cell.template);
    const rowFactory = this._resolver.resolveComponentFactory(RowComponent);
    this._data.forEach(rowData => {
      const rowRef = rowFactory.create(this._injector);
      rowRef.instance.cellTemplates = bodyCellDefTpls;
      rowRef.instance.rowData = rowData;
      rowRef.hostView.detectChanges();
      this._bodyRowContainer.insert(rowRef.hostView);
    });
  }

  private subscribeToDataSource(data: TableDataSource<any>): void {
    data.stream$.subscribe(newData => {
      this._data = newData.data;
      this._totalCount = newData.totalCount;

      setTimeout(() => {
        this.updateView();
      });
    })
  }

  private updateView(): void {
    this._bodyRowContainer?.clear();
    this.createBodyRows();
  }
}
