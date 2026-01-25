import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { PostInterface } from '../../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

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
  ],
  templateUrl: './one-post.component.html',
  styleUrl: './one-post.component.scss',
})
export class OnePostComponent implements OnInit {
  post: PostInterface = {} as PostInterface;

  constructor(
    private blogService: BlogService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('Inicjalizacja komponentu OnePostComponent');
    this.getPost();
  }

  getPost(): void {
    const id = this.router.snapshot.params['id'];
    console.log('Pobieram post o id: ', id);

    if (id !== undefined) {
      this.blogService.getPost(id).subscribe((data) => {
        // console.log('Pobrany post: ', post);
        this.post = data;
      });
    }
  }
}
