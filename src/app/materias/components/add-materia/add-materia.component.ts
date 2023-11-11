import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent {
  private materiasService = inject(MateriasService);
  private snackBar = inject(MatSnackBar);

  formAddMateria: FormGroup;

  constructor() {
    this.formAddMateria = new FormGroup({
      nombreMateria: new FormControl(),
      descMateria: new FormControl(),
    });
  }

  onAddMateria(){
    this.materiasService.addMateria(this.formAddMateria.value).subscribe(
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
          Swal.fire('Error al agregar materia', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    )
  }

}
