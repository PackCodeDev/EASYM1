import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Essay } from './essay';

describe('Essay', () => {
  let component: Essay;
  let fixture: ComponentFixture<Essay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Essay],
    }).compileComponents();

    fixture = TestBed.createComponent(Essay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
