import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AudioRecorder } from '../../utils/audio-recorder.utils';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from '../../services/notes/notes.service';
import { TagsService } from '../../services/tags/tags.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  isRecording: Subject<boolean> = new Subject<boolean>();
  audioRecorder!: AudioRecorder;
  noteForm!: FormGroup;
  tagsSearch = new FormControl('')

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private noteService: NotesService,
    public tagService: TagsService,
    private router: Router
  ) {
    this.audioRecorder = new AudioRecorder()
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: [[]],
      attachment: ['']
    })
  }

  ngOnInit(): void {
  }

  // Form related functions
  get controls(): { [key: string]: AbstractControl } {
    return this.noteForm.controls
  }

  resetForm() {
    this.noteForm.reset()
    this.noteForm.updateValueAndValidity()
  }

  // Tags hanlders
  get addedTags(): string[] {
    return this.controls['tags'].value
  }

  addTag(tagName: string): void {
    this.tagsSearch.reset()
    this.controls['tags'].setValue([...this.addedTags, tagName])
  }

  removeTag(tagName: string): void {
    this.controls['tags'].setValue(this.addedTags.filter(tag => tag !== tagName))
  }

  // Audio Recording handlers
  startRecording(): void {
    this.isRecording.next(true)
    this.audioRecorder.startRecording()
  }

  stopRecording(): void {
    this.audioRecorder.stopRecording()
      .then(url => {
        this.noteForm.controls['attachment'].setValue(this.sanitizer.bypassSecurityTrustResourceUrl(url))
      })
      .catch(err => console.log('something went wrong'))
      .finally(() => this.isRecording.next(false))
  }

  // Add new note
  displayInvalidFields() {
    for (let key in this.controls) {
      if (this.controls[key].invalid) this.controls[key].markAsDirty()
    }
  }

  addNewNote(e: any) {
    e.preventDefault()
    if (this.noteForm.invalid) {
      this.displayInvalidFields()
      return
    }
    this.noteService.addNote(this.noteForm.value)
    this.noteForm.reset()
    this.router.navigate(['/'])
  }

}
