import {
  AfterViewInit,
  Component, ComponentFactoryResolver,
  ContentChildren, Injector, Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ColumnDefDirective } from "../../directives";
import { RowComponent } from "../row/row.component";

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
  dataSource!: any[];

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
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
    this.dataSource.forEach(rowData => {
      const rowRef = rowFactory.create(this.injector);
      rowRef.instance.cellTemplates = bodyCellDefTpls;
      rowRef.instance.rowData = rowData;
      rowRef.hostView.detectChanges();
      this._bodyRowContainer.insert(rowRef.hostView);
    });
  }
}
