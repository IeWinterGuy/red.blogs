import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import { CreatepostService } from '@lib/services/firebase/createpost.service';
import { Observable } from 'rxjs';
import { editorjsConfigReadOnly, toolsConfig } from '../editor.config';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  public editor!: EditorJS;
  public editorObserver!: MutationObserver;

  constructor(public postserv: CreatepostService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const url = this.router.snapshot.queryParams['page'];
    if(url)
    this.postserv.getPublicationFromFirebase(url).then((res) => {
      console.log(res)
      editorjsConfigReadOnly.data = res;
      this.editor = new EditorJS(
        {
          holder: 'editorjs',
          autofocus: false,
          readOnly: true,
          tools: toolsConfig,
          data: res
        }
      )
    })

    this.detectEditorChanges()
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
}
