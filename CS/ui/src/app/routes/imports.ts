import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '@shared/component/header/header.component';
import { TuiTable } from '@taiga-ui/addon-table';
import {
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiHint,
  TuiLabel,
  TuiScrollable,
  TuiScrollbar,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiActionBar, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';

export const COMMON_IMPORT = [
  HeaderComponent,

  CommonModule,
  ReactiveFormsModule,

  TuiButton,
  TuiActionBar,
  TuiHint,
  TuiDropdown,

  TuiDataList,
  TuiDataListWrapper,
  TuiTextfieldControllerModule,

  TuiTextfield,
  TuiLabel,

  // Таблица
  TuiTable,
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
  TuiScrollable,
  TuiScrollbar,
];
