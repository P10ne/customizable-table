import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public data = [
    {
      name: 'some name 1', title: 'some title 1'
    },
    {
      name: 'some name 2', title: 'some title 2'
    }
  ];
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data[0].title = 'changed title';
    }, 3000);
  }

}
