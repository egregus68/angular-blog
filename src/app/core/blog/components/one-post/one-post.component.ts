import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { PostInterface } from '../../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from './add-comment.component/add-comment.component';

@Component({
  selector: 'component-one-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatListModule,
    MatIconModule,
    MatCardContent,
    AsyncPipe,
    MatDialogModule,
  ],
  templateUrl: './one-post.component.html',
  styleUrl: './one-post.component.scss',
})
export class OnePostComponent implements OnInit {
  post$!: Observable<PostInterface>;

  constructor(
    public dialog: MatDialog,
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // console.log('Inicjalizacja komponentu OnePostComponent');
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.params['id'];
    // console.log('Pobieram post o id: ', id);

    // console.log('Pobrany post: ', post);
    this.post$ = this.blogService.getPost(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentComponent, {
      data: { postId: this.route.snapshot.params['id'] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getPost();
    });
  }
}
