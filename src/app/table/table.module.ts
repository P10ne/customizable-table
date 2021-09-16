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
import { SortHeaderComponent } from './components/sort-header/sort-header.component';
import { SortDirective } from './directives/sort.directive';
import { PaginationModule } from "../pagination/pagination.module";



@NgModule({
  declarations: [
    TableComponent,
    RowComponent,
    HeaderCell,
    Cell,
    ColumnDefDirective,
    CellDefDirective,
    CellHeaderDefDirective,
    SortHeaderComponent,
    SortDirective
  ],
  exports: [
    TableComponent,
    HeaderCell,
    ColumnDefDirective,
    CellHeaderDefDirective,
    CellDefDirective,
    Cell,
    SortHeaderComponent,
    SortDirective
  ],
  imports: [
    CommonModule,
    PaginationModule
  ]
})
export class TableModule { }
