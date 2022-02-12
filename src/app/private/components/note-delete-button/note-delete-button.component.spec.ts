import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeleteButtonComponent } from './note-delete-button.component';

describe('NoteDeleteButtonComponent', () => {
  let component: NoteDeleteButtonComponent;
  let fixture: ComponentFixture<NoteDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteDeleteButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
