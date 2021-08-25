import { Component, Directive, TemplateRef } from '@angular/core';

interface ICellDef {
  template: TemplateRef<any>;
}

@Directive()
class CellBase {}

const CELL_TEMPLATE = `<ng-content></ng-content>`;

@Component({
  selector: 'th[app-header-cell]',
  template: CELL_TEMPLATE,
  styleUrls: ['./cell.scss']
})
export class HeaderCell extends CellBase {}

@Component({
  selector: 'td[app-cell]',
  template: CELL_TEMPLATE,
  styleUrls: ['./cell.scss']
})
export class Cell extends CellBase {}

@Directive({
  selector: '[appCellDef]'
})
export class CellDefDirective implements ICellDef {

  constructor(
    public template: TemplateRef<any>
  ) { }

}

@Directive({
  selector: '[appCellHeaderDef]'
})
export class CellHeaderDefDirective implements ICellDef {

  constructor(
    public template: TemplateRef<any>
  ) { }

}
