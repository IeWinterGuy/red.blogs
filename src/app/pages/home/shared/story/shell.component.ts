import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublishNotes } from '@lib/interfaces';
import { CreatepostService } from '@lib/services/firebase/createpost.service';

@Component({
  selector: 'articles',
  templateUrl: './shell.component.html'
})
export class ShellComponent {
  public articles: PublishNotes[] = [];
  constructor(public router: Router, public postServ: CreatepostService) {
    //..
  }
}
