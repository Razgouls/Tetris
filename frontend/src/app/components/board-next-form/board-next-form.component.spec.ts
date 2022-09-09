import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNextFormComponent } from './board-next-form.component';

describe('BoardNextFormComponent', () => {
  let component: BoardNextFormComponent;
  let fixture: ComponentFixture<BoardNextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardNextFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardNextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
