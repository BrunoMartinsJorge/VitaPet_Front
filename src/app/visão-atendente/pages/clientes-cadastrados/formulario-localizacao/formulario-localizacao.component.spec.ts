import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLocalizacaoComponent } from './formulario-localizacao.component';

describe('FormularioLocalizacaoComponent', () => {
  let component: FormularioLocalizacaoComponent;
  let fixture: ComponentFixture<FormularioLocalizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioLocalizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioLocalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
