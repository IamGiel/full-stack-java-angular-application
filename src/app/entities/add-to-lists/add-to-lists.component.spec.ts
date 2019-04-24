import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToListsComponent } from './add-to-lists.component';

describe('AddToListsComponent', () => {
  let component: AddToListsComponent;
  let fixture: ComponentFixture<AddToListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
