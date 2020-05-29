import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/core/models/admin';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAdminService } from 'src/app/core/services/update-admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  admin: Admin;
  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private updateAdminService: UpdateAdminService) { }

  ngOnInit(): void {
    this.getAdmin();
    this.updateAdminService.isUpdated.subscribe(() => this.getAdmin());
  }

  getAdmin() {
    this.adminService.getAdmin().subscribe(
      (data: Admin) => this.admin = data,
      err => console.log(err)
    );
  }
}
