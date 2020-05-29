import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      // Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      password: [null, Validators.required]
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSingIn() {
    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/sawers'], {relativeTo: this.route});
        this.notifyService.notify(data.message);
      },
      err => {
        console.log(err);
        this.notifyService.notify(err);
      }
    );
  }
}
