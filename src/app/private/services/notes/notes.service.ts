import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  index = 6
  private _notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([
    {
      id: 1,
      title: "Test title",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis error commodi omnis quasi.",
      tags: ['Travel', 'Hobby'],
      date: new Date(),
      pinned: false,
      status: 1
    },
    {
      id: 2,
      title: "Pinned note",
      description: "Haaa This is a pinned note Adipisicing elit. Blanditiis error commodi omnis quasi.",
      tags: ['Hobby'],
      date: new Date(),
      pinned: true,
      status: 1
    },
    {
      id: 3,
      title: "Lorem supim",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: ['Demo'],
      date: new Date(),
      pinned: false,
      status: 1
    },
    {
      id: 4,
      title: "Sunt in culpa qui",
      description: "Excepteur sint occaecat cupidatat non proident",
      tags: ['Demo'],
      date: new Date(),
      pinned: false,
      status: 1
    },
    {
      id: 5,
      title: "Ornare quam viverra orci sagittis",
      description: "Diam in arcu cursus euismod quis viverra nibh cras. Cras sed felis eget velit aliquet sagittis id consectetur. Enim nunc",
      tags: ['Demo'],
      date: new Date(),
      pinned: false,
      status: 0
    },
    {
      id: 6,
      title: "Tincidunt tortor aliquam",
      description: "Nisl nunc mi ipsum faucibus vitae aliquet nec. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus.",
      tags: ['Work'],
      date: new Date(),
      pinned: false,
      status: 1
    }
  ])
  public notes = this._notes.asObservable()

  constructor() { }

  protected get state(): Note[] {
    return this._notes.getValue()
  }

  addNote(data: Omit<Note, 'status' | 'id' | 'pinned'>) {
    ++this.index
    const newNote = { id: this.index, pinned: false, data: new Date(), status: 1, ...data }
    this._notes.next([...this.state, newNote])
  }

  removeNote(id: number) {
    this._notes.next(this.state.map((note: Note) => note.id === id ? { ...note, status: 0 } : note))
  }

  togglePin(id: number): void {
    this._notes.next(this.state.map((note: Note) => note.id === id ? { ...note, pinned: !note.pinned } : note))
  }

}
