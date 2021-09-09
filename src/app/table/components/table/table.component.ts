import {
  AfterViewInit,
  Component, ComponentFactoryResolver,
  ContentChildren, Injector, Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ColumnDefDirective, SortDirective } from "../../directives";
import { RowComponent } from "../row/row.component";
import { TableDataSource } from "../../models/TableDataSource";
import { TTableData } from "../../models/TTableData";

@Component({
  selector: 'table[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ContentChildren(ColumnDefDirective)
  private _columns!: QueryList<ColumnDefDirective>;

  @ViewChild('headerRow', { read: ViewContainerRef })
  private _headerRowContainer!: ViewContainerRef;

  @ViewChild('bodyRow', { read: ViewContainerRef })
  private _bodyRowContainer!: ViewContainerRef;

  @Input()
  set dataSource(data: TTableData<any>) {
    if (data instanceof TableDataSource) {
      this.subscribeToDataSource(data);
      data.sorting = this.sort;
    } else {
      this._data = data;
    }
  }

  private _data: any[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private sort: SortDirective
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createHeaderRow();
    this.createBodyRows();
  }

  // todo рефакторинг методов
  private createHeaderRow(): void {
    const headerCellDefTpls = this._columns.map(column => column.headerCell.template);
    const rowFactory = this.resolver.resolveComponentFactory(RowComponent);
    const rowRef = rowFactory.create(this.injector);
    rowRef.instance.cellTemplates = headerCellDefTpls;
    rowRef.hostView.detectChanges();
    this._headerRowContainer.insert(rowRef.hostView);
  }

  private createBodyRows(): void {
    const bodyCellDefTpls = this._columns.map(column => column.cell.template);
    const rowFactory = this.resolver.resolveComponentFactory(RowComponent);
    this._data.forEach(rowData => {
      const rowRef = rowFactory.create(this.injector);
      rowRef.instance.cellTemplates = bodyCellDefTpls;
      rowRef.instance.rowData = rowData;
      rowRef.hostView.detectChanges();
      this._bodyRowContainer.insert(rowRef.hostView);
    });
  }

  private subscribeToDataSource(data: TableDataSource<any>): void {
    data.data.subscribe(newData => {
      this._data = newData;
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
