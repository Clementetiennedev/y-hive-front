import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiariesComponent } from './apiaries.component';

describe('ApiariesComponent', () => {
  let component: ApiariesComponent;
  let fixture: ComponentFixture<ApiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
