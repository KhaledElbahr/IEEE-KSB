import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Volunteer } from 'src/app/core/models/volunteer';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {
  pageTitle = 'Edit Volunteer';
  volunteerForm: FormGroup;
  volunteer: Volunteer;
  roles = [
    { id: 1, name: 'head' },
    { id: 2, name: 'member' },
    { id: 3, name: 'advisor' }
  ];
  committees = [
    { id: 1, name: 'web' },
    { id: 2, name: 'marketing' },
    { id: 3, name: 'hr' },
    { id: 1, name: 'r&p' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<VolunteerComponent>
  ) {}

  ngOnInit(): void {
    this.volunteerForm = this.fb.group({
      arab_name: [null, Validators.required],
      eng_name: [null, Validators.required],
      age: [null, [Validators.required, Validators.max(35), Validators.min(19)]],
      role: [null, Validators.required],
      committee: [null, Validators.required],
      gmail: [null, Validators.required],
      linkedIn: [null, Validators.required]
    });

    // Read the volunteer Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getVolunteer(id);
      }
    );
  }

  get arab_name() { return this.volunteerForm.get('arab_name'); }
  get eng_name() { return this.volunteerForm.get('eng_name'); }
  get age() { return this.volunteerForm.get('age'); }
  get role() { return this.volunteerForm.get('role'); }
  get committee() { return this.volunteerForm.get('committee'); }
  get gmail() { return this.volunteerForm.get('gmail'); }
  get linkedIn() { return this.volunteerForm.get('linkedIn'); }

  getVolunteer(id: number): void {
    this.adminService.getVolunteer(id).subscribe({
      next: (volunteer: Volunteer) => {
        this.displayVolunteer(volunteer);
      },
      error: err => console.log(err)
    });
  }

  displayVolunteer(volunteer: Volunteer): void {
    this.volunteer = volunteer;
    if (this.volunteer.id === 0) {
      this.pageTitle = 'Add Volunteer';
    } else {
      this.pageTitle = 'Edit Volunteer';
    }

    // Update the data on the form
    this.volunteerForm.patchValue(
      {
        arab_name: this.volunteer.arab_name,
        eng_name: this.volunteer.eng_name,
        age: this.volunteer.age,
        role: this.volunteer.role.id,
        committee: this.volunteer.committee.id,
        gmail: this.volunteer.gmail,
        linkedIn: this.volunteer.linkedIn,
      }
    );
  }

  onSave(): void {
    if (this.volunteerForm.valid && this.volunteerForm.dirty) {
      const v = { ...this.volunteer, ...this.volunteerForm.value };
      if (v.id === 0) {
        this.adminService.addVolunteer(v).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify(data.message);
          },
          err => this.notifyService.notify(err)
        );
      } else {
        this.adminService.updateVolunteer(v).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify(data.message);

          },
          err => this.notifyService.notify(err)
        );
      }
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() {
    this.volunteerForm.reset();
    this.router.navigate(['./sawers/volunteers'], { queryParams: null, relativeTo: this.route });
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.applyNavigation();
    });
  }
}
