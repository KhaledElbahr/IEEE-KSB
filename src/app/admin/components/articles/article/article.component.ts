import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/core/models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  pageTitle = 'Edit Article';
  articleForm: FormGroup;
  article: Article;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<ArticleComponent>) {
    // Set the minimum to January 1st 2 years in the past.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 2, 0, 1);
  }


  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: [null, Validators.required],
      link: [null, Validators.required],
      date: [null, Validators.required],
      description: [null, Validators.required],
    });

    // Read the article Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        console.log(id);
        this.getArticle(id);
      }
    );
  }

  get title() { return this.articleForm.get('title'); }
  get link() { return this.articleForm.get('link'); }
  get date() { return this.articleForm.get('date'); }
  get description() { return this.articleForm.get('description'); }

  getArticle(id: number): void {
    this.adminService.getArticle(id).subscribe({
      next: (article: Article) => {
        this.displayArticle(article);
      },
      error: err => console.log(err)
    });
  }

  displayArticle(article: Article): void {
    this.article = article;
    if (this.article.id === 0) {
      this.pageTitle = 'Add Article';
    } else {
      this.pageTitle = 'Edit Article';
    }

    // Update the data on the form
    this.articleForm.patchValue(
      {
        title: this.article.title,
        link: this.article.link,
        date: this.article.date,
        description: this.article.description
      }
    );
  }

  onSave(): void {
    if (this.articleForm.valid && this.articleForm.dirty) {
      const r = { ...this.article, ...this.articleForm.value };
      if (r.id === 0) {
        this.adminService.addArticle(r).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify(data.message);
          },
          err => this.notifyService.notify(err)
        );
      } else {
        this.adminService.updateArticle(r).subscribe(
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

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no article or the article is unchanged
    if (!this.articleForm.dirty) {
      return true;
    }
    // Otherwise ask the user with the notification service and return its
    // observable which resolves to true or false when the user decides
    return this.notifyService.confirm('Discard changes?');
  }

  applyNavigation() {
    this.articleForm.reset();
    this.router.navigate(['./sawers/articles'], { queryParams: null, relativeTo: this.route });
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
