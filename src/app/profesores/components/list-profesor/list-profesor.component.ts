import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from 'src/app/shared/interfaces/shared.interface';
import { ModifyProfesorComponent } from '../modify-profesor/modify-profesor.component';
import { DeleteProfesorComponent } from '../delete-profesor/delete-profesor.component';
import { AddProfesorComponent } from '../add-profesor/add-profesor.component';

@Component({
  selector: 'app-list-profesor',
  templateUrl: './list-profesor.component.html',
  styleUrls: ['./list-profesor.component.css']
})
export class ListProfesorComponent {
  constructor(
    private profesoresService: ProfesoresService,
    private authService: AuthService,
    private profesor: MatDialog,
  ) {}

  loading: boolean = false;
  isAdminFlag: boolean = false;

  public dataSource: MatTableDataSource<Profesor> = new MatTableDataSource<Profesor>(
    []
  );

  displayedColumns: string[] = [
    'id',
    'nombreProfesor',
    'correo',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de clientes...');
    this.isAdminFlag = this.authService.isAdmin();
    this.loading = true;
    this.profesoresService.getProfesores().subscribe(
      {
        next: (profesores: Profesor[]) => {
            this.dataSource = new MatTableDataSource<Profesor>(profesores);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
        },
        error: (e:any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }

  openAgregarProfesor(){
    const dialogRef = this.profesor.open(AddProfesorComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.profesoresService.getProfesores().subscribe(
          {
            next: (profesores: Profesor[]) => {
              this.dataSource.data = profesores;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              this.loading = false;
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }

  openModificarProfesor(profesorID: string){
    const dialogRef = this.profesor.open(ModifyProfesorComponent, {
      data: profesorID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.profesoresService.getProfesores().subscribe(
          {
            next: (profesores: Profesor[]) => {
              this.dataSource.data = profesores;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });}

  openBorrarProfesor(profesorID: string){
    const dialogRef = this.profesor.open(DeleteProfesorComponent, {
      data: profesorID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.profesoresService.getProfesores().subscribe(
          {
            next: (profesores: Profesor[]) => {
              this.dataSource.data = profesores;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }

}
