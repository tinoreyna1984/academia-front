import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-materia',
  templateUrl: './show-materia.component.html',
  styleUrls: ['./show-materia.component.css']
})
export class ShowMateriaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public materia: any) {}
}
