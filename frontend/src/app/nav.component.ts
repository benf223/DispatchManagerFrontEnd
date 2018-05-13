import {Component} from '@angular/core';

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/">Recur</button>
      <button mat-button routerLink="/planning">Planning</button>
      <span style="flex: 1 1 auto"></span>
    </mat-toolbar>    
  `
})
export class NavComponent
{
  constructor()
  {
  }
}
