import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoInputComponent } from './opcao-input.component';

describe('OpcaoInputComponent', () => {
  let component: OpcaoInputComponent;
  let fixture: ComponentFixture<OpcaoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcaoInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcaoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
