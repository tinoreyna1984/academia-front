import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-profesor',
  templateUrl: './show-profesor.component.html',
  styleUrls: ['./show-profesor.component.css']
})
export class ShowProfesorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public profesor: any) {}
}
