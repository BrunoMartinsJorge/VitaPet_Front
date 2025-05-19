import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputArquivoComponent } from './input-arquivo.component';

describe('InputArquivoComponent', () => {
  let component: InputArquivoComponent;
  let fixture: ComponentFixture<InputArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputArquivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
