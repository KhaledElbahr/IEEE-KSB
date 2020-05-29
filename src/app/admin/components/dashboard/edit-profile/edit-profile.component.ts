import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admin } from 'src/app/core/models/admin';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateAdminService } from 'src/app/core/services/update-admin.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfile: FormGroup;
  admin: Admin;
  updatedValue: Admin;
  // isUpdatedAdmin = false;

  roles = [
    { id: 1, name: 'head' },
    { id: 2, name: 'member' },
    { id: 3, name: 'advisor' }
  ];
  committees = [
    { id: 1, name: 'web' },
    { id: 2, name: 'marketing' },
    { id: 3, name: 'hr' },
    { id: 4, name: 'r&p' },
  ];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notifyService: NotificationService,
    private updateAdminService: UpdateAdminService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.admin = data;
  }

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      id: this.admin.id,
      name: [this.admin.name, Validators.required],
      email: [this.admin.email, [Validators.required, Validators.email]],
      password: [this.admin.password],
      role: [this.admin.role.id, Validators.required],
      committee: [this.admin.committee.id, Validators.required],
      image: this.admin.image
    });
    this.editProfile.valueChanges.subscribe(data => {
      console.log(data);
      this.updatedValue = data;
    });
  }

  get name() { return this.editProfile.get('name'); }
  get email() { return this.editProfile.get('email'); }
  get password() { return this.editProfile.get('password'); }
  get role() { return this.editProfile.get('role'); }
  get committee() { return this.editProfile.get('committee'); }
  get image() { return this.editProfile.get('image'); }

  onSave() {
    if (this.updatedValue) {
      this.adminService.updateAdminProfile(this.updatedValue).subscribe(
        data => {
          this.notifyService.notify(data.message);
          this.onClose();
        },
        (err: any) => this.notifyService.notify(err)
      );
    } else {
      this.onClose();
    }
  }

  onCancel() {
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
    // this.dialogRef.afterClosed().subscribe(() => {
    //   if (this.updatedValue) {
    //     return true;
    //     // this.getAdmin();
    //     // this.updateAdminService.UpdateAdmin(this.isUpdatedAdmin);
    //   } else {
    //     return false;
    //   }
    // });
  }

  // getAdmin() {
  //   this.adminService.getAdmin().subscribe(
  //     (data: Admin) => {
  //       this.admin = data;
  //     },
  //     err => console.log(err)
  //   );
  // }
}
