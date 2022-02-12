import { Component, ChangeDetectionStrategy, Output, HostListener, EventEmitter, OnDestroy } from '@angular/core';
import { interval, Subject, takeUntil, tap, filter, Observable } from 'rxjs';

@Component({
  selector: 'app-note-delete-button',
  templateUrl: './note-delete-button.component.html',
  styleUrls: ['./note-delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDeleteButtonComponent implements OnDestroy {
  progress: Subject<number> = new Subject<number>()
  state: Subject<string> = new Subject<string>()
  cancel!: Observable<string>;
  $destroy: Subject<string> = new Subject<string>()
  @Output() onDone: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {
    this.cancel = this.state.pipe(
      takeUntil(this.$destroy),
      filter(ev => ev === 'cancel'),
      tap(() => this.progress.next(0))
    )
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel')
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    this.state.next('start')
    interval(100)
      .pipe(takeUntil(this.cancel), takeUntil(this.$destroy))
      .subscribe((p) => {
        const progress = p * 10
        if (progress <= 100) {
          this.progress.next(progress)
          if (progress == 100) this.onDone.emit(true)
        }
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next('')
    this.$destroy.unsubscribe()
  }

}
