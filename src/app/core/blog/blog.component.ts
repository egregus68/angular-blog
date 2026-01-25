import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCellDef,
  MatHeaderCellDef,
  MatRowDef,
  MatHeaderRowDef,
  MatNoDataRow,
} from '@angular/material/table';
import { GetPostInterace } from '../interfaces/get-post.interface';
import { PostInterface } from '../interfaces/post.interface';
import { BlogService } from './blog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'component-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatLabel,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'text', 'createdDateTime', 'author', 'delete'];
  dataSource: MatTableDataSource<PostInterface> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllPost();
  }

  delete(id: string): void {
    console.log('Usuwam id: ', id);
  }

  goToPost(id: string): void {
    // console.log('ide do postu o id: ', id);
    this.router.navigate([`/one-post/${id}`]);
  }

  getAllPost(): void {
    const data: GetPostInterace = {
      page: '0',
      size: '10000',
    };

    this.blogService.getAllPost(data).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
