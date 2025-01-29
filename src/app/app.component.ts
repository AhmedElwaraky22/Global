import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './component/parent/parent.component';
import { ChildComponent } from "./component/child/child.component";




@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ParentComponent],
})
export class AppComponent {
  title = 'JobGloable';
}
