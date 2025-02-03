import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCreationComponent } from './passenger-creation.component';

describe('PassengerCreationComponent', () => {
  let component: PassengerCreationComponent;
  let fixture: ComponentFixture<PassengerCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
