import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  message: string;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    }, { updateOn: 'blur' });

    this.newPass.valueChanges.subscribe(() => {
      this.confirmPass.updateValueAndValidity();
    });
  }

  get oldPass() { return this.resetPassword.get('oldPass'); }

  get newPass() { return this.resetPassword.get('newPass'); }

  get confirmPass() { return this.resetPassword.get('confirmPass'); }

  onChangePassword() {
    const formValue = this.resetPassword.value;
    this.auth.changePassword(formValue).subscribe(
      data => {
        this.message = data.message;
        this.onClose();

      },
      err => {
        this.message = err.message;
      },
    );
  }

  onCancel() {
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      if (this.message) { this.notifyService.notify(this.message); }
    });
  }
}
