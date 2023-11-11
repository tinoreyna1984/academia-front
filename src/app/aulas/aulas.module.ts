import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulasLayoutComponent } from './layout/aulas-layout/aulas-layout.component';
import { AddAulaComponent } from './components/add-aula/add-aula.component';
import { DeleteAulaComponent } from './components/delete-aula/delete-aula.component';
import { ModifyAulaComponent } from './components/modify-aula/modify-aula.component';
import { ListAulaComponent } from './components/list-aula/list-aula.component';
import { AulaPageComponent } from './pages/aula-page/aula-page.component';
import { AulasRoutingModule } from './aulas-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowProfesorComponent } from './components/show-profesor/show-profesor.component';
import { ShowMateriaComponent } from './components/show-materia/show-materia.component';



@NgModule({
  declarations: [
    AulasLayoutComponent,
    AddAulaComponent,
    DeleteAulaComponent,
    ModifyAulaComponent,
    ListAulaComponent,
    AulaPageComponent,
    ShowProfesorComponent,
    ShowMateriaComponent
  ],
  imports: [
    CommonModule,
    AulasRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AulasModule { }
