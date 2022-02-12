import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TagFilterPipe } from './pipes/tag-filter.pipe';
import { NoteFilterPipe } from './pipes/note-filter.pipe';
import { NoteDeleteButtonComponent } from './components/note-delete-button/note-delete-button.component';
import { HeaderSearchbarComponent } from './components/header-searchbar/header-searchbar.component';
import { NoteCardComponent } from './components/note-card/note-card.component';



@NgModule({
  declarations: [
    PrivateComponent,
    SidebarComponent,
    HeaderComponent,
    AddNoteComponent,
    TooltipDirective,
    TagFilterPipe,
    NoteFilterPipe,
    NoteDeleteButtonComponent,
    HeaderSearchbarComponent,
    NoteCardComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
