import { first } from 'rxjs/operators';
import { CoursesService } from './../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  id = '';
  isAddMode = true;
  isLoading = true;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe(x => {
            this.form.patchValue(x);
            this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
    } else {
      this.service.edit(this.form.value, this.id)
      .subscribe(result => this.onSuccess(), error => this.onError());
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
