import { Component, inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';
import { DepartmentService } from '@shared/api/department/department.service';
import { getFieldValue } from '@shared/data/function';
import { Base } from '@shared/data/interface';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [...COMMON_IMPORT],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected getFieldValue = getFieldValue;

  constructor(protected title: Title, private depApi: DepartmentService) {
    this.getDepartmentsData();
  }

  getDepartmentsData() {
    this.depApi.get().subscribe((data) => {
      this.departmentsForm.controls['list'] = new FormArray([]);

      data.forEach((dep) => {
        this.departmentsList.push(
          new FormGroup({
            id: new FormControl(dep.id ?? ''),
            name: new FormControl(dep.name ?? ''),
          })
        );
      });
    });
  }

  protected departmentsForm: FormGroup = new FormGroup({
    list: new FormArray([]),
  });

  get departmentsList(): FormArray {
    return this.departmentsForm.get('list') as FormArray;
  }

  protected newDepartment = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
  });

  createDialogOpen(content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Добавить',
      no: 'Отменить',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Добавить новую кафедру',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.add(this.newDepartment.value as Base) : '';
          this.newDepartment.reset();
        })
      )
      .subscribe();
  }

  add(body: Base, update: boolean = true) {
    this.depApi.create(body).subscribe((data) => {
      this.departmentsList.push(
        new FormGroup({
          name: new FormControl(body.name ?? ''),
        })
      );
      if (update) this.getDepartmentsData();
    });
  }

  editDialogOpen(id: number, content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Изменить',
      no: 'Отменить',
    };

    this.newDepartment.setValue(this.departmentsList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Изменить информацию о кафедре',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.edit(id, this.newDepartment.value as Base) : '';
          this.newDepartment.reset();
        })
      )
      .subscribe();
  }

  edit(id: number, body: Base) {
    this.depApi
      .change(this.departmentsList.at(id).value.id, body)
      .subscribe((data) => {
        this.departmentsList.at(id).patchValue(body);
      });
  }

  deleteDialogOpen(id: number) {
    const data = {
      yes: 'Удалить',
      no: 'Отменить',
    };

    this.newDepartment.setValue(this.departmentsList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить кафедру',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.delete(id) : '';
        })
      )
      .subscribe();
  }

  delete(id: number) {
    this.depApi
      .delate(this.departmentsList.at(id).value.id)
      .subscribe((data) => {
        this.departmentsList.removeAt(id);
      });
  }
}
