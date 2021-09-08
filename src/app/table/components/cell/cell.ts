import { Directive, TemplateRef } from '@angular/core';

interface ICellDef {
  template: TemplateRef<any>;
}

@Directive()
class CellBase {}

@Directive({
  selector: 'th[app-header-cell]'
})
export class HeaderCell extends CellBase {}

@Directive({
  selector: 'td[app-cell]'
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
