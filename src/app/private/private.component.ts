import { ChangeDetectionStrategy, Component, OnInit, } from '@angular/core';
import { NotesService } from './services/notes/notes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PrivateComponent implements OnInit {
  filterBy!: Observable<Params | null>;

  constructor(public noteService: NotesService, private ar: ActivatedRoute) {
    this.filterBy = this.ar.queryParams
  }

  ngOnInit(): void {
  }

}
