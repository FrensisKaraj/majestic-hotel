import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviwsComponent } from './reviws.component';

describe('ReviwsComponent', () => {
  let component: ReviwsComponent;
  let fixture: ComponentFixture<ReviwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviwsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
