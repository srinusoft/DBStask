import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [

  {path:'',redirectTo: '/adduser', pathMatch: 'full'},
{path:'listuser',component:ListComponent},
{path:'adduser',component:AdduserComponent},
{path:"**",component:AdduserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
