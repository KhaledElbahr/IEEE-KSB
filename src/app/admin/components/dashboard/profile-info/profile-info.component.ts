import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/core/models/admin';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/core/services/admin.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ResetPasswordComponent } from 'src/app/auth/components/reset-password/reset-password.component';
import { UpdateAdminService } from './../../../../core/services/update-admin.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  admin: Admin;
  isUpdatedAdmin = false;
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private updateAdminService: UpdateAdminService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  onEdit(admin): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: admin
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAdmin();
      this.updateAdminService.UpdateAdmin(this.isUpdatedAdmin);
    });
    // this.router.navigate(['./'], {queryParams: {'edit-profile': true}, relativeTo: this.route});
  }

  onResetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    dialogRef.afterClosed().subscribe(() => this.getAdmin());
  }

  getAdmin() {
    this.adminService.getAdmin().subscribe(
      (data: Admin) => {
        this.admin = data;
      },
      err => console.log(err)
    );
  }
}
