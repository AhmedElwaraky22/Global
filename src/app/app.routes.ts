import { Routes } from '@angular/router';
import { ParentComponent } from './component/parent/parent.component';
import { ChildComponent } from './component/child/child.component';

export const routes: Routes = [
  { path: '', component:  ParentComponent},
  { path: 'child', component:  ChildComponent},
];
