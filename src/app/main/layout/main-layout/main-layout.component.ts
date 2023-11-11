import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit  {

  userRole: string | null = '';
  userRealName: string | null = '';
  isAdminFlag: boolean = false;

  constructor(private authService: AuthService) {}

  // al iniciar el componente
  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
    this.userRealName = this.authService.getUserRealNameFromToken();
    this.isAdminFlag = this.authService.isAdmin();
    console.log("rol: " + this.userRole);
    console.log("nombre: " + this.userRealName);
    console.log("isAdmin: " + this.isAdminFlag);
  }

  onLogout() {
    this.authService.logout();
  }

}
