import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteCardComponent implements OnInit {
  @Input('note') note!: Note
  @Output() pinNote: EventEmitter<number> = new EventEmitter<number>()
  @Output() removeNote: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pinNoteEmitter() {
    this.pinNote.emit()
  }

  removeNoteEmitter() {
    this.removeNote.emit()
  }

}
