import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogarContaComponent } from './logar-conta.component';

describe('LogarContaComponent', () => {
  let component: LogarContaComponent;
  let fixture: ComponentFixture<LogarContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogarContaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
