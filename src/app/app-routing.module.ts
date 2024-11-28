import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ChildrenComponent } from './children/children.component';

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'child', component: ChildrenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
