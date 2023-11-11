import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { AulasService } from '../../services/aulas.service';
import { MateriasService } from 'src/app/materias/services/materias.service';
import { ProfesoresService } from 'src/app/profesores/services/profesores.service';
import { Materia, Profesor } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-add-aula',
  templateUrl: './add-aula.component.html',
  styleUrls: ['./add-aula.component.css']
})
export class AddAulaComponent {
  private aulasService = inject(AulasService);
  private materiasService = inject(MateriasService);
  private profesoresService = inject(ProfesoresService);
  private snackBar = inject(MatSnackBar);

  formAddAula: FormGroup;

  profesores!: Profesor[];
  materias!: Materia[];
  
  constructor() {
    this.formAddAula = new FormGroup({
      codAula: new FormControl(),
      fechaHoraRegistro: new FormControl(),
      tema: new FormControl(),
      profesorId: new FormControl(),
      materiaId: new FormControl(),
    });

    this.profesoresService.getProfesores().subscribe(
      {
        next: (profesores: Profesor[]) => {
          this.profesores = profesores;
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error en la carga de profesores', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
    this.materiasService.getMaterias().subscribe(
      {
        next: (materias: Materia[]) => {
          this.materias = materias;
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error en la carga de materias', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }

  onAddAula(){
    console.log(this.formAddAula.value);
    //return;
    this.aulasService.addAula(this.formAddAula.value).subscribe(
      {
        next: (response: any) => {
          //console.log(response);
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al agregar aula', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    )
  }

}
