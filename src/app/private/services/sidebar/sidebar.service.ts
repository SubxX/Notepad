import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _sidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public sidebarOpened = this._sidebar.asObservable()

  private _searchbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public searchbar = this._searchbar.asObservable()

  constructor() { }

  get state(): boolean {
    return this._sidebar.getValue()
  }

  toggleSidebar() {
    this._sidebar.next(!this.state)
  }

  setSidebar(state: boolean) {
    this._sidebar.next(state)
  }

  toggleSearchbar() {
    this._searchbar.next(!this._searchbar.getValue())
  }

}
