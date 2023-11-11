import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { AulasService } from '../../services/aulas.service';
import { MateriasService } from 'src/app/materias/services/materias.service';
import { ProfesoresService } from 'src/app/profesores/services/profesores.service';
import {
  Aula,
  Materia,
  Profesor,
} from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-aula',
  templateUrl: './modify-aula.component.html',
  styleUrls: ['./modify-aula.component.css'],
})
export class ModifyAulaComponent {
  private aulasService = inject(AulasService);
  private materiasService = inject(MateriasService);
  private aulaID: string = inject(MAT_DIALOG_DATA);
  private profesoresService = inject(ProfesoresService);
  private snackBar = inject(MatSnackBar);
  private aula!: Aula;
  loading: boolean = false;

  formModifyAula: FormGroup;

  profesores!: Profesor[];
  materias!: Materia[];

  constructor() {
    this.formModifyAula = new FormGroup({
      codAula: new FormControl(),
      fechaHoraRegistro: new FormControl(),
      tema: new FormControl(),
      profesorId: new FormControl(),
      materiaId: new FormControl(),
    });

    this.profesoresService.getProfesores().subscribe({
      next: (profesores: Profesor[]) => {
        this.profesores = profesores;
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error en la carga de profesores',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
    this.materiasService.getMaterias().subscribe({
      next: (materias: Materia[]) => {
        this.materias = materias;
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error en la carga de materias',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.aulasService.getAula(this.aulaID).subscribe({
        next: (response: Aula) => {
          this.loading = false;
          this.aula = response;
          //console.log(this.profesor);
          this.formModifyAula.patchValue({
            codAula: this.aula.codAula,
            fechaHoraRegistro: this.aula.fechaHoraRegistro,
            tema: this.aula.tema,
            profesorId: this.aula.profesor.id,
            materiaId: this.aula.materia.id,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el aula',
            'No se encuentra el aula con ID ' + this.aulaID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyAula() {
    this.aulasService
      .modifyAula(this.formModifyAula.value, this.aulaID)
      .subscribe({
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
            'Error al modificar aula',
            'Razón: ' +
              e.message +
              '. Consulta con el administrador, por favor.',
            'error'
          );
        },
      });
  }
}
