import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public form: FormGroup;
  postNew: Post;
  Error = false;
  hide = true;
  hide_confirm_password = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: String;
  post: Post;
  status: Status[] = [
    {value: 'missing', viewValue: 'Desaparecido'},
    {value: 'found', viewValue: 'Encontrado'}
  ];

  fileName = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: PostService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.searchPost()
    this.loadForm()
  }

  loadForm(){
    this.form = this.fb.group({
      id:[this.id],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [null],
      file: [null]
    });
  }

  async searchPost(){
    this.id = this.route.snapshot.params.id;
    await this.service.getPost(this.id).toPromise().then(p => this.post = p["post"]).catch(err=>console.error(err));
    this.form.get('title').setValue(this.post.title)
    this.form.get('description').setValue(this.post.description)
    this.form.get('title').updateValueAndValidity()
    this.form.get('description').updateValueAndValidity()
  }

  openSnackBar(msg: string, className: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className],
    });
  }

  public submitForm(): void {
    this.postNew = this.form.value;
    this.spinner.show();
    this.service.updatePost(this.postNew).subscribe(
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
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
        this.form.get("file").setValue(reader.result);
        this.form.get("file").updateValueAndValidity();
    };
  }

}
