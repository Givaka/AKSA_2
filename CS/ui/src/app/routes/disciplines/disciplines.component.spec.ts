import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesComponent } from './disciplines.component';

describe('DisciplinesComponent', () => {
  let component: DisciplinesComponent;
  let fixture: ComponentFixture<DisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
