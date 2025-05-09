import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';
import { DisciplineService } from '@shared/api/discipline/discipline.service';
import { getFieldValue } from '@shared/data/function';
import { Base } from '@shared/data/interface';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { PolymorpheusContent } from 'node_modules/@taiga-ui/polymorpheus/types/content';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [...COMMON_IMPORT],
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.scss',
})
export class DisciplinesComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected getFieldValue = getFieldValue;

  protected readonly stringify = ({ name }: Base): string => `${name ?? ''}`;

  constructor(protected title: Title, private disApi: DisciplineService) {
    this.getDisciplinesData();
  }

  getDisciplinesData() {
    this.disApi.get().subscribe((data) => {
      this.disciplinesForm.controls['list'] = new FormArray([]);

      data.forEach((dis) => {
        this.disciplinesList.push(
          new FormGroup({
            id: new FormControl(dis.id ?? ''),
            name: new FormControl(dis.name ?? ''),
          })
        );
      });
    });
  }

  protected disciplinesForm: FormGroup = new FormGroup({
    list: new FormArray([]),
  });

  get disciplinesList(): FormArray {
    return this.disciplinesForm.get('list') as FormArray;
  }

  protected newDiscipline = new FormGroup({
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
        label: 'Добавить новую дисциплину',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.add(this.newDiscipline.value as Base) : '';
          this.newDiscipline.reset();
        })
      )
      .subscribe();
  }

  add(body: Base, update: boolean = true) {
    this.disApi.create(body).subscribe((data) => {
      this.disciplinesList.push(
        new FormGroup({
          name: new FormControl(body.name ?? ''),
        })
      );
      if (update) this.getDisciplinesData();
    });
  }

  editDialogOpen(id: number, content: PolymorpheusContent<TuiDialogContext>) {
    const data = {
      content,
      yes: 'Изменить',
      no: 'Отменить',
    };

    this.newDiscipline.setValue(this.disciplinesList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Изменить информацию о дисциплине',
        size: 's',
        data,
      })
      .pipe(
        switchMap(async (res) => {
          res ? this.edit(id, this.newDiscipline.value as Base) : '';
          this.newDiscipline.reset();
        })
      )
      .subscribe();
  }

  edit(id: number, body: Base) {
    this.disApi
      .change(this.disciplinesList.at(id).value.id, body)
      .subscribe((data) => {
        this.disciplinesList.at(id).patchValue(body);
      });
  }

  deleteDialogOpen(id: number) {
    const data = {
      yes: 'Удалить',
      no: 'Отменить',
    };

    this.newDiscipline.setValue(this.disciplinesList.at(id).value);

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить дисциплину',
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
    this.disApi
      .delate(this.disciplinesList.at(id).value.id)
      .subscribe((data) => {
        this.disciplinesList.removeAt(id);
      });
  }
}
