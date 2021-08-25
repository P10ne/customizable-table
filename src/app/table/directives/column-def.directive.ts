import { ContentChild, Directive, Input } from '@angular/core';
import {
  CellHeaderDefDirective,
  CellDefDirective
} from "../components/cell/cell";

@Directive({
  selector: '[appColumnDef]'
})
export class ColumnDefDirective  {

  @ContentChild(CellHeaderDefDirective)
  private _headerCell!: CellHeaderDefDirective;

  @ContentChild(CellDefDirective)
  private _cell!: CellDefDirective;

  @Input()
  appColumnDef: string = '';

  get headerCell(): CellHeaderDefDirective {
    return this._headerCell;
  }

  get cell(): CellDefDirective {
    return this._cell;
  }

  constructor() { }
}
