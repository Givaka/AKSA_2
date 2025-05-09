import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';
import { GroupService } from '@shared/api/group/group.service';
import { ReferenceService } from '@shared/api/reference/reference.service';
import { StudentsService } from '@shared/api/students/students.service';
import { getFieldValue } from '@shared/data/function';
import { Base, Student, Teacher } from '@shared/data/interface';
import { TuiDay } from '@taiga-ui/cdk/date-time';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiFilterByInputPipe,
  TuiInputNumber,
  TuiStringifyContentPipe,
} from '@taiga-ui/kit';
import { TuiInputDateModule, TuiComboBoxModule } from '@taiga-ui/legacy';
import { PolymorpheusContent } from 'node_modules/@taiga-ui/polymorpheus/types/content';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    ...COMMON_IMPORT,
    TuiInputDateModule,
    TuiComboBoxModule,
    TuiFilterByInputPipe,
    TuiStringifyContentPipe,
    TuiInputNumber,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected getFieldValue = getFieldValue;

  protected groupList: Base[] = [];
  private groupMapId = new Map();
  private groupMapName = new Map();

  protected formStudyList: Base[] = [];
  private formStudyMapId = new Map();
  private formStudyMapName = new Map();

  protected formAdmissionList: Base[] = [];
  private formAdmissionMapId = new Map();
  private formAdmissionMapName = new Map();

  protected statusStudentList: Base[] = [];
  private statusStudentMapId = new Map();
  private statusStudentMapName = new Map();

  protected statusBenefitList: Base[] = [];
  private statusBenefitMapId = new Map();
  private statusBenefitMapName = new Map();

  protected readonly stringify = ({ name }: Base): string => `${name ?? ''}`;

  constructor(
    protected title: Title,
    private studApi: StudentsService,
    private groupApi: GroupService,
    private refApi: ReferenceService
  ) {
    combineLatest([
      groupApi.get(),
      refApi.getFormStudy(),
      refApi.getFormAdmission(),
      refApi.getStatusStudent(),
      refApi.getStatusBenefit(),
    ]).subscribe(
      ([
        groupData,
        formStudyData,
        formAdmissionData,
        statusStudentData,
        statusBenefitData,
      ]) => {
        groupData.forEach((group) => {
          this.groupList.push({ id: group.id, name: group.name });
          this.groupMapId.set(group.id, group.name);
          this.groupMapName.set(group.id, group.name);
        });
        formStudyData.forEach((formStudy) => {
          this.formStudyList.push({ id: formStudy.id, name: formStudy.name });
          this.formStudyMapId.set(formStudy.id, formStudy.name);
          this.formStudyMapName.set(formStudy.id, formStudy.name);
        });
        formAdmissionData.forEach((formAdmission) => {
          this.formAdmissionList.push({
            id: formAdmission.id,
            name: formAdmission.name,
          });
          this.formAdmissionMapId.set(formAdmission.id, formAdmission.name);
          this.formAdmissionMapName.set(formAdmission.id, formAdmission.name);
        });
        statusStudentData.forEach((statusStudent) => {
          this.statusStudentList.push({
            id: statusStudent.id,
            name: statusStudent.name,
          });
          this.statusStudentMapId.set(statusStudent.id, statusStudent.name);
          this.statusStudentMapName.set(statusStudent.id, statusStudent.name);
        });

        statusBenefitData.forEach((statusStudent) => {
          this.statusBenefitList.push({
            id: statusStudent.id,
            name: statusStudent.name,
          });
          this.statusBenefitMapId.set(statusStudent.id, statusStudent.name);
          this.statusBenefitMapName.set(statusStudent.id, statusStudent.name);
        });

        this.getStudentsData();
      }
    );
  }

  getStudentsData() {
    this.studApi.get().subscribe((data) => {
      this.studentsForm.controls['list'] = new FormArray([]);

      data.forEach((dep) => {
        const statusBenefit = dep.statusBenefit
          ? {
              id: dep.statusBenefit,
              name: this.statusBenefitMapName.get(dep.statusBenefit),
            }
          : null;

        this.studentList.push(
          new FormGroup({
            id: new FormControl(dep.id),
            fullname: new FormControl(dep.fullname, Validators.required),
            birthday: new FormControl(
              TuiDay.fromUtcNativeDate(new Date(dep.birthday)),
              Validators.required
            ),
            group: new FormControl(
              {
                id: dep.group,
                name: this.groupMapName.get(dep.group),
              },
              Validators.required
            ),
            course: new FormControl(1, Validators.required),
            dayEnrollment: new FormControl(
              TuiDay.fromUtcNativeDate(new Date(dep.dayEnrollment)),
              Validators.required
            ),

            formAdmission: new FormControl(
              {
                id: dep.formAdmission,
                name: this.formAdmissionMapName.get(dep.formAdmission),
              },
              Validators.required
            ),
            statusStudy: new FormControl(
              {
                id: dep.statusStudy,
                name: this.statusStudentMapName.get(dep.statusStudy),
              },
              Validators.required
            ),
            formStudy: new FormControl(
              {
                id: dep.formStudy,
                name: this.formStudyMapName.get(dep.formStudy),
              },
              Validators.required
            ),

            statusBenefit: new FormControl(null, Validators.required),

            scholarship: new FormControl(null, Validators.required),

            is_removed: new FormControl(false, Validators.required),
          })
        );
      });

      console.log(this.studentList.value);
    });
  }

  protected studentsForm = new FormGroup({
    list: new FormArray([]),
  });

  protected get studentList(): FormArray {
    return this.studentsForm.get('list') as FormArray;
  }

  protected newStudent = new FormGroup({
    id: new FormControl(),
    fullname: new FormControl('', Validators.required),
    birthday: new FormControl(null, Validators.required),
    group: new FormControl(null, Validators.required),
    course: new FormControl(1, Validators.required),
    formAdmission: new FormControl(null, Validators.required),
    dayEnrollment: new FormControl(null, Validators.required),
    statusStudy: new FormControl(null, Validators.required),
    formStudy: new FormControl(null, Validators.required),
    statusBenefit: new FormControl(null, Validators.required),
    scholarship: new FormControl(null, Validators.required),

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
        label: 'Добавить нового студента',
        size: 'm',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.add(this.newStudent.value) : '';
          this.newStudent.reset({
            course: 1,
            is_removed: false,
          });
        })
      )
      .subscribe();
  }

  add(body: any) {
    const reqBody: Student = {
      fullname: body.fullname,
      birthday: body.birthday,

      group: body.group.id,
      course: body.course,

      dayEnrollment: body.dayEnrollment,
      statusStudy: body.statusStudy.id,

      formAdmission: body.formAdmission.id,
      formStudy: body.formStudy.id,
      statusBenefit: body.statusBenefit?.id ?? null,

      scholarship: body.scholarship,

      is_removed: body.is_removed,
    };

    this.studApi.create(reqBody).subscribe((data) => {
      this.getStudentsData();
    });
  }

  editDialogOpen(id: number, content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Изменить',
      no: 'Отменить',
    };

    console.log(this.studentList.at(id).value);

    this.newStudent.setValue(this.studentList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Изменить информацию о студенте',
        size: 'm',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.edit(id, this.newStudent.value) : '';
          this.newStudent.reset({
            course: 1,
            is_removed: false,
          });
        })
      )
      .subscribe();
  }

  edit(id: number, body: any) {
    const reqBody: Student = {
      fullname: body.fullname,
      birthday: body.birthday,

      group: body.group.id,
      course: body.course,

      dayEnrollment: body.dayEnrollment,
      statusStudy: body.statusStudy.id,

      formAdmission: body.formAdmission.id,
      formStudy: body.formStudy.id,
      statusBenefit: body.statusBenefit?.id ?? null,

      scholarship: body.scholarship,

      is_removed: body.is_removed,
    };

    this.studApi
      .change(this.studentList.at(id).value.id, reqBody)
      .subscribe((data) => {
        this.studentList.at(id).patchValue(body);
      });
  }

  deleteDialogOpen(id: number) {
    const data = {
      yes: 'Удалить',
      no: 'Отменить',
    };

    this.newStudent.setValue(this.studentList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить данные о студенте?',
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
    this.studApi.delate(this.studentList.at(id).value.id).subscribe((data) => {
      this.studentList.removeAt(id);
    });
  }
}
