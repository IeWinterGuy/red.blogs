import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import EditorJS from '@editorjs/editorjs';
import { IUser, PublishNotes } from '@lib/interfaces';
import { MaterialModule } from '@lib/material/material.module';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { collection, Firestore } from 'firebase/firestore';
import { debounceTime, Observable, skip } from 'rxjs';
import { editorjsConfig } from '../editor.config';

@Component({
  selector: 'post',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public editorData: unknown;
  public editor!: EditorJS;
  public editorObserver!: MutationObserver;
  public item$: Observable<import("@angular/fire/firestore").DocumentData[]>;
  public user!: IUser;
  private user_id!: string;

  public subscriptions = {
    user: null
  }

  constructor(public firestore: Firestore,
    public postserv: CreatepostService,
    public auth: AuthService,
    private _snackBar: MatSnackBar,
    private bareDialog: Dialog) {
    const col = collection(firestore, 'items');
    this.user = <IUser>{};
    this.item$ = collectionData(col);

    auth.getIdTokenClaims().subscribe((res) => {
      const user_id = (res?.['sub'] as string).split('|')[1];
      this.user_id = user_id;
    })
  }

  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig)

    this.detectEditorChanges().pipe(
      debounceTime(200),
      skip(1)
    ).subscribe({ next: () => {
        this.editor.save().then(async (outputData) => {
          this.editorData =  JSON.stringify(outputData, null, 2);
          Object.create(<PublishNotes>{})
          /* put draft creation logic here */
        });
      }
    });

    this.auth.user$.subscribe({
      next: (userinfo) => {
        if(userinfo) {
          this.user.name = userinfo.name;
        }
      }
    })
  }

  @ViewChild('editorjs')
  div!: ElementRef<HTMLInputElement>;

  detectEditorChanges(): Observable <unknown> {
    return new Observable(observer => {
      const editorDom = <Element>document.querySelector('#editorjs');
      const config = { attributes: true, childList: true, subtree: true };
      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      })

      this.editorObserver.observe(editorDom, config);
    })
  }

  public saveEditorData() : void {
    this.editor.save().then((outputData) => {
      (outputData as PublishNotes).author = this.user?.name;
      if(outputData.blocks.length > 0) {
        const dialogRef = this.bareDialog.open<string>(EditComponent, {
          width: '100vw',
          height:'100%',
          minHeight: '100vh',
          maxWidth: 'unset',
          panelClass: ['my-outlined-dialog', 'no-scrollbar', 'overflow-container', 'rounded-none'],
          data: outputData,
          disableClose: true
        });

        dialogRef.closed.subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      } else {
        this._snackBar.open('start writting to publish.','dismiss');
      }
    })

  }

  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }
}
