import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMMON_IMPORT } from '@routes/imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...COMMON_IMPORT],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(protected title: Title) {}
}
