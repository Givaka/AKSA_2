import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    children: [
      { path: '', redirectTo: 'h', pathMatch: 'full' },
      {
        path: 'h',
        loadComponent: () =>
          import('@routes/home/home.component').then(
            (mod) => mod.HomeComponent
          ),
        title: 'Домашняя',
      },
      {
        path: 't',
        loadComponent: () =>
          import('@routes/teachers/teachers.component').then(
            (mod) => mod.TeachersComponent
          ),
        title: 'Преподаватели',
      },
      {
        path: 's',
        loadComponent: () =>
          import('@routes/students/students.component').then(
            (mod) => mod.StudentsComponent
          ),
        title: 'Студенты',
      },
      {
        path: 'g',
        loadComponent: () =>
          import('@routes/groups/groups.component').then(
            (mod) => mod.GroupsComponent
          ),
        title: 'Группы',
      },
      {
        path: 'r',
        children: [
          {
            path: 'disciplines',
            loadComponent: () =>
              import('@routes/disciplines/disciplines.component').then(
                (mod) => mod.DisciplinesComponent
              ),
            title: 'Дисциплины',
          },
          {
            path: 'departments',
            loadComponent: () =>
              import('@routes/departments/departments.component').then(
                (mod) => mod.DepartmentsComponent
              ),
            title: 'Кафедры',
          },
        ],
      },

      { path: '**', redirectTo: 'h' },
    ],
  },
];
