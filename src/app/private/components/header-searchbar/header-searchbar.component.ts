import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-header-searchbar',
  templateUrl: './header-searchbar.component.html',
  styleUrls: ['./header-searchbar.component.scss']
})
export class HeaderSearchbarComponent implements OnInit, OnDestroy {
  $destroy: Subject<boolean> = new Subject<boolean>()
  search: FormControl = new FormControl('', [Validators.required])
  lastTypeBeforeSearch: any


  constructor(private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.queryParams.pipe(takeUntil(this.$destroy), filter(({ type }) => type !== 'search'))
      .subscribe(({ type }) => {
        if (type) this.lastTypeBeforeSearch = { type }
      })
    this.search.valueChanges
      .pipe(takeUntil(this.$destroy), debounceTime(250), distinctUntilChanged())
      .subscribe((keyword) => {
        if (!keyword) {
          this.router.navigate(['/'], { queryParams: this.lastTypeBeforeSearch || {} })
        } else {
          this.router.navigate(['/'], { queryParams: { type: 'search', by: keyword } })
        }
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.unsubscribe()
    if (this.search) this.router.navigate(['/'], { queryParams: this.lastTypeBeforeSearch || {} })
  }

}
