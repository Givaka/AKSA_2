import { Component, inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';
import { ReferenceService } from '@shared/api/reference/reference.service';
import { TeachersService } from '@shared/api/teachers/teachers.service';
import { getFieldValue } from '@shared/data/function';
import { Base, Teacher } from '@shared/data/interface';
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiFilterByInputPipe,
  TuiStringifyContentPipe,
} from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiInputDateModule } from '@taiga-ui/legacy';
import { PolymorpheusContent } from 'node_modules/@taiga-ui/polymorpheus/types/content';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    ...COMMON_IMPORT,
    TuiInputDateModule,
    TuiComboBoxModule,
    TuiFilterByInputPipe,
    TuiStringifyContentPipe,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected getFieldValue = getFieldValue;

  protected positionList: Base[] = [];
  private positionMapId = new Map();
  private positionMapName = new Map();

  protected statusScientificList: Base[] = [];
  private statusScientificMapId = new Map();
  private statusScientificMapName = new Map();

  protected readonly stringify = ({ name }: Base): string => `${name ?? ''}`;

  constructor(
    protected title: Title,
    private teachApi: TeachersService,
    private refApi: ReferenceService
  ) {
    combineLatest([
      refApi.getPosition(),
      refApi.getStatusScientific(),
    ]).subscribe(([positionData, statusScientificData]) => {
      positionData.forEach((position: Base) => {
        this.positionList.push({ id: position.id, name: position.name });
        this.positionMapId.set(position.name, position.id);
        this.positionMapName.set(position.id, position.name);
      });
      statusScientificData.forEach((statusScientific: Base) => {
        this.statusScientificList.push({
          id: statusScientific.id,
          name: statusScientific.name,
        });
        this.statusScientificMapId.set(
          statusScientific.name,
          statusScientific.id
        );
        this.statusScientificMapName.set(
          statusScientific.id,
          statusScientific.name
        );
      });

      this.getTeachersData();
    });
  }

  getTeachersData() {
    this.teachApi.get().subscribe((data) => {
      this.teacherForm.controls['list'] = new FormArray([]);

      data.forEach((dep) => {
        const statusScientific = dep.statusScientific
          ? {
              id: dep.statusScientific,
              name: this.statusScientificMapName.get(dep.statusScientific),
            }
          : null;

        this.teacherList.push(
          new FormGroup({
            id: new FormControl(dep.id),
            fullname: new FormControl(dep.fullname, Validators.required),
            birthday: new FormControl(
              TuiDay.fromUtcNativeDate(new Date(dep.birthday)),
              Validators.required
            ),
            position: new FormControl(
              {
                id: dep.position,
                name: this.positionMapName.get(dep.position),
              },
              Validators.required
            ),
            statusScientific: new FormControl(statusScientific),
            dayAppointment: new FormControl(
              TuiDay.fromUtcNativeDate(new Date(dep.dayAppointment)),
              Validators.required
            ),
            dayHiring: new FormControl(
              TuiDay.fromUtcNativeDate(new Date(dep.dayHiring)),
              Validators.required
            ),
            is_removed: new FormControl(false, Validators.required),
          })
        );
      });

      console.log(this.teacherList.value);
    });
  }

  protected teacherForm: FormGroup = new FormGroup({
    list: new FormArray([]),
  });

  get teacherList(): FormArray {
    return this.teacherForm.get('list') as FormArray;
  }

  protected newTeacher = new FormGroup({
    id: new FormControl(),
    fullname: new FormControl('', Validators.required),
    birthday: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    statusScientific: new FormControl(null),
    dayAppointment: new FormControl(null, Validators.required),
    dayHiring: new FormControl(null, Validators.required),
    is_removed: new FormControl(false, Validators.required),
  });

  createDialogOpen(content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Добавить',
      no: 'Отменить',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Добавить нового преподавателя',
        size: 'm',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.add(this.newTeacher.value) : '';
          this.newTeacher.reset();
        })
      )
      .subscribe();
  }

  add(body: any) {
    const reqBody: Teacher = {
      fullname: body.fullname,
      birthday: body.birthday,
      dayHiring: body.dayHiring,
      dayAppointment: body.dayAppointment,
      position: body.position.id,
      statusScientific: body.statusScientific.id,
      is_removed: body.is_removed,
    };

    this.teachApi.create(reqBody).subscribe((data) => {
      this.getTeachersData();
    });
  }

  editDialogOpen(id: number, content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Изменить',
      no: 'Отменить',
    };

    this.newTeacher.setValue(this.teacherList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Изменить информацию о преподавателе',
        size: 'm',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.edit(id, this.newTeacher.value) : '';
          this.newTeacher.reset();
        })
      )
      .subscribe();
  }

  edit(id: number, body: any) {
    const reqBody: Teacher = {
      fullname: body.fullname,
      birthday: body.birthday,
      dayHiring: body.dayHiring,
      dayAppointment: body.dayAppointment,
      position: body.position.id,
      statusScientific: body.statusScientific?.id ?? null,
      is_removed: body.is_removed,
    };

    this.teachApi
      .change(this.teacherList.at(id).value.id, reqBody)
      .subscribe((data) => {
        this.teacherList.at(id).patchValue(body);
      });
  }

  deleteDialogOpen(id: number) {
    const data = {
      yes: 'Удалить',
      no: 'Отменить',
    };

    this.newTeacher.setValue(this.teacherList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить данные о преподавателе?',
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
    this.teachApi.delate(this.teacherList.at(id).value.id).subscribe((data) => {
      this.teacherList.removeAt(id);
    });
  }
}
