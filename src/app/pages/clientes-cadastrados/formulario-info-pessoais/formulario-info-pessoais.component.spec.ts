import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInfoPessoaisComponent } from './formulario-info-pessoais.component';

describe('FormularioInfoPessoaisComponent', () => {
  let component: FormularioInfoPessoaisComponent;
  let fixture: ComponentFixture<FormularioInfoPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInfoPessoaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInfoPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
