import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../interfaces/tag.interface';

@Pipe({
  name: 'tagFilter',
  pure: true
})
export class TagFilterPipe implements PipeTransform {

  transform(tags: Tag[] | null, addedTags: string[], search: string): Tag[] | null {
    if (!tags || !search) return null
    const regex = new RegExp(`${search}`, 'gi');
    return tags.filter((tag) => tag.name.match(regex) && !addedTags.includes(tag.name))
  }

}
