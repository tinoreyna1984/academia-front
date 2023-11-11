import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { MateriasService } from '../../services/materias.service';
import { Materia } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-materia',
  templateUrl: './modify-materia.component.html',
  styleUrls: ['./modify-materia.component.css']
})
export class ModifyMateriaComponent {
  private materiasService = inject(MateriasService);
  private snackBar = inject(MatSnackBar);
  private materiaID: string = inject(MAT_DIALOG_DATA);
  private materia!: Materia;
  loading: boolean = false;

  formModifyMateria: FormGroup;

  constructor() {
    this.formModifyMateria = new FormGroup({
      nombreMateria: new FormControl(),
      descMateria: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.materiasService.getMateria(this.materiaID).subscribe({
        next: (response: Materia) => {
          this.loading = false;
          this.materia = response;
          //console.log(this.profesor);
          this.formModifyMateria.patchValue({
            nombreMateria: this.materia.nombreMateria,
            descMateria: this.materia.descMateria,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el profesor',
            'No se encuentra el profesor con ID ' + this.materiaID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyMateria(){
    this.materiasService.modifyMateria(this.formModifyMateria.value, this.materiaID).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.snackBar.openFromComponent(MessageSnackBarComponent, {
          duration: 3500,
          data: response.mensaje,
        });
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error al modificar materia',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }
}
