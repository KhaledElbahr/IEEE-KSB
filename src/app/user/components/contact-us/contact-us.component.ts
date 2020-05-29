import { UserService } from '../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.minLength(11)],
      comment: null
    });
  }

  get name() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }

  get phone() { return this.contactForm.get('phone'); }

  get comment() { return this.contactForm.get('comment'); }

  onSubmit() {
    // tslint:disable-next-line: max-line-length
    // window.confirm('THANK YOU FOR YOUR MESSAGE. IT HAS BEEN SENT Successfully. We appreciate you taking the time to get in touch with us. We will be in contact with you shortly. Have an awesome day!');
    console.log(this.contactForm.value);
    this.userService.sendFeedback(this.contactForm.value).subscribe(
      data => {
        console.log(data);
        this.contactForm.reset();
        this.router.navigate(['thanks'], { relativeTo: this.route });
      },
      err => console.log(err)
    );

  }
}
