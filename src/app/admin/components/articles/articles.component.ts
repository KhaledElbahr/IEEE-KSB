import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Article } from 'src/app/core/models/article';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/core/services/admin.service';
import { ArticleComponent } from './article/article.component';
import { UploadImageComponent } from '../../shared/components/upload-image/upload-image.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  displayedColumns: string[] = ['image', 'title', 'link', 'date', 'actions'];
  dataSource = new MatTableDataSource<Article>();
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

    // TODO: Using Resolve Service to get Articles from the server before navigate to dashboard component
    this.route.data.subscribe(
      (data: Article[]) => {
        // tslint:disable-next-line: no-string-literal
        this.articles = data['resolvedData'];
        this.dataSource = new MatTableDataSource<Article>(this.articles);
      },
      err => console.log(err)
    );
    // this.getArticles();
    // this.paginator.length = this.paginator.pageSize;

    // console.log(this.paginator);
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.paginator.length = this.paginator.pageSize;
  // }

  onCreate(): void {
    this.router.navigate(['./article'], { queryParams: { id: 0, 'add-article': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(ArticleComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    this.router.navigate(['./article'], { queryParams: { id: 0, 'add-article': true }, relativeTo: this.route });
    dialogRef.afterClosed().subscribe(() => this.getArticles());
  }

  onEdit(article: Article): void {
    const id = article.id;
    this.router.navigate(['./article'], { queryParams: { id: `${id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(ArticleComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: article
    });
    dialogRef.afterClosed().subscribe(() => this.getArticles());
  }

  onUploadImage(article: Article) {
    const id = article.id;
    this.router.navigate(['./article'], { queryParams: { id: `${id}`, 'add-image': 'article' }, relativeTo: this.route });
    const dialogRef = this.dialog.open(UploadImageComponent, {
      disableClose: false,
      autoFocus: true,
      width: '35%',
      data: article
    });
    dialogRef.afterClosed().subscribe(() => this.getArticles());
  }

  onDelete(article: Article): void {
    console.log(article.id);
    const confirmation = window.confirm('Are you sure you want to remove this article?');
    if (confirmation) {
      this.delete(article);
    }
  }

  getArticles() {
    this.adminService.getArticles().subscribe(
      data => {
        this.articles = data;
        this.dataSource = new MatTableDataSource<Article>(this.articles);
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

  delete(article: Article) {
    this.adminService.deleteArticle(article.id).subscribe(
      data => {
        this.getArticles();
        this.notifyService.notify(data.message);
      },
      err => this.notifyService.notify(err)
    );
  }
}
