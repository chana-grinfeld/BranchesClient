import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesDetailsComponent } from './branches/branches-details/branches-details.component';

const routes: Routes = [
  { path: 'branches', component: BranchesDetailsComponent, data: { type: 'show' } },
  { path: '', component: BranchesDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }