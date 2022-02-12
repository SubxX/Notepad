import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateModule } from './private/private.module';

const routes: Routes = [
  { path: '', loadChildren: () => PrivateModule, pathMatch: 'full' },
  { path: '**', redirectTo: '/', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
