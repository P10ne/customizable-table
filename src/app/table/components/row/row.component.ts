import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'tr[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RowComponent implements AfterViewInit {
  @ViewChild('rowContainer', { read: ViewContainerRef })
  private _rowContainer!: ViewContainerRef;

  @Input()
  cellTemplates!: TemplateRef<any>[];

  @Input()
  rowData!: Record<string, any>;

  constructor() { }

  ngAfterViewInit(): void {
    this.cellTemplates.forEach(cellTpl => {
      const view = cellTpl.createEmbeddedView({ $implicit: this.rowData } );
      this._rowContainer.insert(view);
    })
  }
}
