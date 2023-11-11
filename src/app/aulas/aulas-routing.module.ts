import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AulasLayoutComponent } from './layout/aulas-layout/aulas-layout.component';
import { AulaPageComponent } from './pages/aula-page/aula-page.component';

const routes: Routes = [
  {
    path: '',
    component: AulasLayoutComponent,
    children: [
      {
        path: '',
        component: AulaPageComponent,
      },
      {
        path: '**',
        redirectTo: 'aulas',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulasRoutingModule { }
