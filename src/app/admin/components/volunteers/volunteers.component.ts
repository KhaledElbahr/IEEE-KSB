import { Component, OnInit, ViewChild } from '@angular/core';
import { Volunteer } from 'src/app/core/models/volunteer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/core/services/admin.service';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { UploadImageComponent } from '../../shared/components/upload-image/upload-image.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  volunteers: Volunteer[];
  displayedColumns: string[] = ['image', 'arab_name', 'eng_name', 'gmail', 'linkedIn', 'age', 'role', 'committee', 'actions'];
  dataSource = new MatTableDataSource<Volunteer>();

  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // this.getVolunteers();
    // TODO: Using Resolve Service to get Volunteers from the server before navigate to dashboard component
    this.route.data.subscribe(
      (data: Volunteer[]) => {
        console.log(data);
        // tslint:disable-next-line: no-string-literal
        this.volunteers = data['resolvedData'];
        this.dataSource = new MatTableDataSource<Volunteer>(this.volunteers);
      },
      err => console.log(err)
    );
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(VolunteerComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    this.router.navigate(['./volunteer'], { queryParams: { id: 0, 'add-volunteer': true }, relativeTo: this.route });
    dialogRef.afterClosed().subscribe(() => this.getVolunteers());
  }

  onEdit(volunteer: Volunteer): void {
    const id = volunteer.id;
    this.router.navigate([`./volunteer`], { queryParams: { id: `${id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(VolunteerComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: volunteer
    });
    dialogRef.afterClosed().subscribe(() => this.getVolunteers());
  }

  onUploadImage(volunteer: Volunteer) {
    const id = volunteer.id;
    this.router.navigate(['./volunteer'], { queryParams: { id: `${id}`, 'add-image': 'volunteer' }, relativeTo: this.route });
    const dialogRef = this.dialog.open(UploadImageComponent, {
      disableClose: false,
      autoFocus: true,
      width: '35%',
      data: volunteer
    });
    dialogRef.afterClosed().subscribe(() => this.getVolunteers());
  }

  onDelete(volunteer: Volunteer): void {
    console.log(volunteer.id);
    const confirmation = window.confirm('Are you sure you want to remove this volunteer?');
    if (confirmation) {
      this.delete(volunteer);
    }
  }

  getVolunteers() {


    this.adminService.getVolunteers().subscribe(
      data => {
        console.log(data);
        this.volunteers = data;
        this.dataSource = new MatTableDataSource<Volunteer>(this.volunteers);
      },
      err => console.log(err)
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  delete(volunteer: Volunteer) {
    this.adminService.deleteVolunteer(volunteer.id).subscribe(
      data => {
        this.getVolunteers();
        this.notifyService.notify(data.message);
      },
      err => this.notifyService.notify(err)
    );
  }
}
