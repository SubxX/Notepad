import { Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';
import { Note } from '../interfaces/note.interface';

@Pipe({
  name: 'noteFilter',
  pure: true
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[] | null, params: Params | null): Note[] | null {
    if (!notes || !params) return null
    const { type, by } = params
    const localNotes = notes.filter(note => type === 'archive' ? !Boolean(note.status) : Boolean(note.status))

    // Filtered deleted notes
    if (type === 'archive') return localNotes

    // Filtered searched notes
    if (type === 'search') {
      const regex = new RegExp(`${by}`, 'gi');
      return localNotes.filter(note => note.title.match(regex) || note.description.match(regex))
    }

    // Filtered notes by tag
    return !type ? localNotes : localNotes.filter(note => type === 'pinned' ? note.pinned : note.tags.includes(type))
  }

}
