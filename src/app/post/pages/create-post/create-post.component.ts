import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  postNew: Post;
  Error = false;
  hide = true;
  hide_confirm_password = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  formData = new FormData();
  fileName = '';


  constructor(private router: Router,
    private service: PostService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [null]
    });
  }

  openSnackBar(msg: string, className: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className],
    });
  }

  public submitForm(): void {
    this.spinner.show();
    this.service.createPost(this.formData).subscribe(
      (post) => {
        this.spinner.hide();
        console.log(post);
        this.openSnackBar(
          'Enviado com sucesso.',
          'success-snackbar'
        );
        this.router.navigate(['/home']);
        this.form.reset();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.openSnackBar(err.message, 'error-snackbar');
        this.Error = true;
      }
    );
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    this.fileName = file.name
    this.formData.append("file",file)
    this.formData.append("title",this.form.get('title').value)
    this.formData.append("description",this.form.get('description').value)
  }

}
