import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesoresPageComponent } from './pages/profesores-page/profesores-page.component';
import { ProfesoresLayoutComponent } from './layout/profesores-layout/profesores-layout.component';
import { ListProfesorComponent } from './components/list-profesor/list-profesor.component';
import { AddProfesorComponent } from './components/add-profesor/add-profesor.component';
import { ModifyProfesorComponent } from './components/modify-profesor/modify-profesor.component';
import { DeleteProfesorComponent } from './components/delete-profesor/delete-profesor.component';
import { ProfesoresRoutingModule } from './profesores-routing.module';



@NgModule({
  declarations: [
    ProfesoresPageComponent,
    ProfesoresLayoutComponent,
    ListProfesorComponent,
    AddProfesorComponent,
    ModifyProfesorComponent,
    DeleteProfesorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ProfesoresRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfesoresModule { }
