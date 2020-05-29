import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/core/models/statistics';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  state: Statistics;
  articlesInMon: string;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getStatistics().subscribe(
      data => {
        this.state = data;
        this.displayArticlesInMonTitle();
      },
      err => console.log(err)
    );
  }

  displayArticlesInMonTitle() {
    (this.state.articlesmonth.count === 0) ?
    this.articlesInMon = 'No Articles in this Month' :
    this.articlesInMon = `Articles in ${this.state.articlesmonth.month}`;
  }
}
