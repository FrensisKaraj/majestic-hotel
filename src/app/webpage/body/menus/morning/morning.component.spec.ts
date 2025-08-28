import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningComponent } from './morning.component';

describe('MorningComponent', () => {
  let component: MorningComponent;
  let fixture: ComponentFixture<MorningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
