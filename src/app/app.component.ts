import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from "./component/nav-bar/nav-bar.component";
import { ParentComponent } from './component/parent/parent.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';




@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavBarComponent , ParentComponent ,RegisterComponent ,LoginComponent ],
})
export class AppComponent {
  title = 'JobGloable';
}
