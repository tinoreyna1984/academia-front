import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-profesor',
  templateUrl: './modify-profesor.component.html',
  styleUrls: ['./modify-profesor.component.css']
})
export class ModifyProfesorComponent implements OnInit {
  private profesoresService = inject(ProfesoresService);
  private snackBar = inject(MatSnackBar);
  private profesorID: string = inject(MAT_DIALOG_DATA);
  private profesor!: Profesor;
  loading: boolean = false;

  formModifyProfesor: FormGroup;

  constructor() {
    this.formModifyProfesor = new FormGroup({
      nombreProfesor: new FormControl(),
      apellidosProfesor: new FormControl(),
      correo: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.profesoresService.getProfesor(this.profesorID).subscribe({
        next: (response: Profesor) => {
          this.loading = false;
          this.profesor = response;
          //console.log(this.profesor);
          this.formModifyProfesor.patchValue({
            nombreProfesor: this.profesor.nombreProfesor,
            apellidosProfesor: this.profesor.apellidosProfesor,
            correo: this.profesor.correo,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el profesor',
            'No se encuentra el profesor con ID ' + this.profesorID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyProfesor(){
    this.profesoresService.modifyProfesor(this.formModifyProfesor.value, this.profesorID).subscribe({
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
          'Error al modificar profesor',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }
}
