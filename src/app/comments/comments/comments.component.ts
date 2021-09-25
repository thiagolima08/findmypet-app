import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commentt } from '../models/comment';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: String;
  comments = []
  
  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute, private service: CommentsService, private spinner: NgxSpinnerService,  private _snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.form = this.fb.group({
      post_id:[this.id],
      comment_text: ['', [Validators.required]],
    });
    this.getComments()
  }

  public submitForm(): void {
    this.spinner.show();
    this.service.postComments(this.form.value).subscribe(
      (comment) => {
        this.spinner.hide();
        console.log(comment);
        this.openSnackBar(
          'Enviado com sucesso.',
          'success-snackbar'
        );
        this.getComments();
        this.form.reset();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.openSnackBar(err.message, 'error-snackbar');
      }
    );
  }

  getComments(){
    this.service.getComments(this.id).subscribe(
      (comments) => {
        this.comments = comments["comments"]
      }
    )
  }

  openSnackBar(msg: string, className: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className],
    });
  }

}
