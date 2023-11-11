import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { MateriasService } from '../../services/materias.service';
import { Materia } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-delete-materia',
  templateUrl: './delete-materia.component.html',
  styleUrls: ['./delete-materia.component.css']
})
export class DeleteMateriaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private materiaID: string,
    private materiasService: MateriasService,
    private snackBar: MatSnackBar
  ) {}

  materia?: Materia;

  onBorrarMateria() {
    this.materiasService.borrarMateria(this.materiaID).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al borrar materia', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
      
    );
  }

}
