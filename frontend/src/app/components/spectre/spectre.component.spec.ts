import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectreComponent } from './spectre.component';

describe('SpectreComponent', () => {
  let component: SpectreComponent;
  let fixture: ComponentFixture<SpectreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
