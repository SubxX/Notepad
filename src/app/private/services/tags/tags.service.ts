import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../../interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([
    {
      id: 'travel-tag',
      name: 'Travel',
      createdAt: new Date()
    },
    {
      id: 'hobby-tag',
      name: 'Hobby',
      createdAt: new Date()
    },
    {
      id: 'work-tag',
      name: 'Work',
      createdAt: new Date()
    },
    {
      id: 'demo-tag',
      name: 'Demo',
      createdAt: new Date()
    }
  ])
  tags = this._tags.asObservable()

  constructor() { }

  protected get state(): Tag[] {
    return this._tags.getValue()
  }

  createTag(name: string) {
    const newNote: Tag = {
      id: Math.random().toString(),
      name,
      createdAt: new Date()
    }
    this._tags.next([...this.state, newNote])
  }

  deleteTag(id: string) {
    this._tags.next(this.state.filter(tag => tag.id !== id))
  }

}
