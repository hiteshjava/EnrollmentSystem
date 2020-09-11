import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SelectedItemComponent } from './selected-item/selected-item.component';


const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'item', component:SelectedItemComponent },
  { path: '', component:LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
