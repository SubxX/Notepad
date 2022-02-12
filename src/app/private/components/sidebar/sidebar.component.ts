import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { TagsService } from '../../services/tags/tags.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  addTag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  name = new FormControl('', [Validators.required])
  sidebarState!: Observable<boolean>

  constructor(private sidebarService: SidebarService, public tagService: TagsService) {
    this.sidebarState = this.sidebarService.sidebarOpened
      .pipe(tap(() => {
        if (this.addTag.getValue()) this.closeAddTag()
      }))
  }

  ngOnInit(): void {
  }

  addNote(e: any): void {
    e.preventDefault()
    if (this.name.invalid) return
    this.tagService.createTag(this.name.value)
    this.closeAddTag()
  }

  openAddTag() {
    if (this.sidebarService.state) this.sidebarService.setSidebar(false)
    this.addTag.next(true)
  }

  closeAddTag() {
    this.name.reset()
    this.addTag.next(false)
  }

}
