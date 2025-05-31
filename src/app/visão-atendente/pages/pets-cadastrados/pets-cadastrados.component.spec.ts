import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsCadastradosComponent } from './pets-cadastrados.component';

describe('PetsCadastradosComponent', () => {
  let component: PetsCadastradosComponent;
  let fixture: ComponentFixture<PetsCadastradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsCadastradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsCadastradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
