import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateFormPostInterface } from '../../../interfaces/create-form-post.interface';
import { CreatePostInterface } from '../../../interfaces/create-post.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

@Component({
  selector: 'component-blog-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class BlogPageComponent implements OnInit {
  blogForm: FormGroup<CreateFormPostInterface> = new FormGroup<CreateFormPostInterface>({
    text: new FormControl(null, Validators.required),
    publicationDate: new FormControl(null),
  });

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private route: Router,
  ) {
    dayjs.extend(utc);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.blogForm.invalid) {
      return;
    }

    console.log('data publikacji: ' + this.blogForm.value.publicationDate);

    const localDate = this.blogForm.value.publicationDate;
    const dateUtc = dayjs(localDate).utc();

    const data: CreatePostInterface = {
      text: this.blogForm.value.text!,
      scope: 'PRIVATE',
      publicationDate: dateUtc?.toJSON(),
    };

    this.blogService.addPost(data).subscribe(
      (response) => {
        this.blogForm.reset();
        this.route.navigate(['blog-page']);
        this.toastr.success('Post został dodany');
      },
      (error) => {
        this.toastr.error('Błąd w formularzu! Nie udało się dodać postu.');
      },
    );
  }
}
