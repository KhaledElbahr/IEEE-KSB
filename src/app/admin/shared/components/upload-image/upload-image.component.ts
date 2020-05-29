import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFile: File;
  element: any;
  pageTitle: string;
  elementType: string;
  constructor(
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.element = data;
  }

  ngOnInit(): void {
    // Read the Object Type from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        this.elementType = params.get('add-image');
        this.pageTitle = this.elementType;
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUploadImage() {
    const id = this.element.id;
    console.log(id);
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    return this.http.post(`http://localhost/IEEE-KSB/api/upload-${this.elementType}-image.php?id=${id}`, uploadData).pipe(
      map((data: any) => data),
      catchError(err => throwError(err))
    ).subscribe((data) => {
      this.notifyService.notify(data.message);
      this.onClose();
    },
    err => this.notifyService.notify(err)
    );
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.location.back();
    });
  }
}
