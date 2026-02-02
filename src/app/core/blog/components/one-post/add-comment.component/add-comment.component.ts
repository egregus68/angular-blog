import { Component, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BlogService } from '../../../blog.service';
import { ToastrService } from 'ngx-toastr';
import { CreateCommentInterface } from '../../../../interfaces/create-comment.interface';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'component-add-comment.component',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup = new FormGroup({
    text: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    postId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
  });
  constructor(
    public dialogRef: MatDialogRef<AddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogService,
    private toastr: ToastrService,
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.commentForm.get('postId')?.setValue(this.data.postId);}

  add(): void {
    if (this.commentForm.invalid) {
      console.log('invalid form');
      return;
    }
    const data: CreateCommentInterface = {
      text: this.commentForm.get('text')?.value!,
      postId: this.data.postId,
    };

    console.log(data);

    this.blogService.addComment(data).subscribe(
      (data) => {
        this.toastr.success('Komentarz został dodany');
      },
      (error) => {
        this.toastr.error('Wystąpił błąd podczas dodawania komentarza');
      },
    );
    this.dialogRef.close(true);
  }

  noAction(): void {
    this.dialogRef.close(false);
  }
}
