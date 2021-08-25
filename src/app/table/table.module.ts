import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { RowComponent } from './components/row/row.component';
import {
  Cell,
  HeaderCell,
  CellDefDirective,
  CellHeaderDefDirective
} from './components/cell/cell';
import {
  ColumnDefDirective
} from './directives';



@NgModule({
  declarations: [
    TableComponent,
    RowComponent,
    HeaderCell,
    Cell,
    ColumnDefDirective,
    CellDefDirective,
    CellHeaderDefDirective
  ],
  exports: [
    TableComponent,
    HeaderCell,
    ColumnDefDirective,
    CellHeaderDefDirective,
    CellDefDirective,
    Cell
  ],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
