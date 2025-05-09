import { Component, inject } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';
import { DepartmentService } from '@shared/api/department/department.service';
import { GroupService } from '@shared/api/group/group.service';
import { getFieldValue } from '@shared/data/function';
import { Base } from '@shared/data/interface';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { TuiMultiSelectModule } from '@taiga-ui/legacy';
import { PolymorpheusContent } from 'node_modules/@taiga-ui/polymorpheus/types/content';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [...COMMON_IMPORT, TuiMultiSelectModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected getFieldValue = getFieldValue;

  protected disciplineList: Base[] = [];

  constructor(protected title: Title, private groupApi: GroupService) {
    this.getGroupsData();
  }

  getGroupsData() {
    this.groupApi.get().subscribe((data) => {
      this.groupsForm.controls['list'] = new FormArray([]);

      data.forEach((group) => {
        this.groupsList.push(
          new FormGroup({
            id: new FormControl(group.id ?? ''),
            name: new FormControl(group.name ?? ''),
          })
        );
      });
    });
  }

  protected groupsForm: FormGroup = new FormGroup({
    list: new FormArray([]),
  });

  get groupsList(): FormArray {
    return this.groupsForm.get('list') as FormArray;
  }

  protected newGroup = new FormGroup({
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
        label: 'Добавить новую группу',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.add(this.newGroup.value as Base) : '';
          this.newGroup.reset();
        })
      )
      .subscribe();
  }

  add(body: Base, update: boolean = true) {
    this.groupApi.create(body).subscribe((data) => {
      this.groupsList.push(
        new FormGroup({
          name: new FormControl(body.name ?? ''),
        })
      );
      if (update) this.getGroupsData();
    });
  }

  editDialogOpen(id: number, content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Изменить',
      no: 'Отменить',
    };

    this.newGroup.setValue(this.groupsList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Изменить информацию о группе',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.edit(id, this.newGroup.value as Base) : '';
          this.newGroup.reset();
        })
      )
      .subscribe();
  }

  edit(id: number, body: Base) {
    this.groupApi
      .change(this.groupsList.at(id).value.id, body)
      .subscribe((data) => {
        this.groupsList.at(id).patchValue(body);
      });
  }

  deleteDialogOpen(id: number) {
    const data = {
      yes: 'Удалить',
      no: 'Отменить',
    };

    this.newGroup.setValue(this.groupsList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить группу',
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
    this.groupApi.delate(this.groupsList.at(id).value.id).subscribe((data) => {
      this.groupsList.removeAt(id);
    });
  }
}
