import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToDosComponent } from './list-to-dos.component';

describe('ListToDosComponent', () => {
  let component: ListToDosComponent;
  let fixture: ComponentFixture<ListToDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListToDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
