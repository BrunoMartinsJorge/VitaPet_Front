import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComplementaresComponent } from './formulario-complementares.component';

describe('FormularioComplementaresComponent', () => {
  let component: FormularioComplementaresComponent;
  let fixture: ComponentFixture<FormularioComplementaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComplementaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioComplementaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
