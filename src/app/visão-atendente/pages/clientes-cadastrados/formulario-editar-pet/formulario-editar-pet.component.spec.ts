import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarPetComponent } from './formulario-editar-pet.component';

describe('FormularioEditarPetComponent', () => {
  let component: FormularioEditarPetComponent;
  let fixture: ComponentFixture<FormularioEditarPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEditarPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEditarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
