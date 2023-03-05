import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PublishNotes } from '@lib/interfaces/post.interface';
import { Observable, switchMap } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getDatabase, onValue, ref as dbref } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class CreatepostService {
  constructor(public firestore: Firestore,
    public RTDfetchPush: AngularFireDatabase,
    public http: HttpClient) { }



  public addPosts(post: PublishNotes) {
    const booksRef = collection(this.firestore, 'posts');
    return addDoc(booksRef, post);
  }

  public postToRTDatabase(post: PublishNotes, id: string): Promise<number> {
    const itemRef = this.RTDfetchPush.object(id);
    return itemRef.set(post).then(() => {
      return 200;
    });
  }

  public getPosts(): Observable<PublishNotes[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<PublishNotes[]>;
  }

  public deleteBook(post: PublishNotes) {
    const bookDocRef = doc(this.firestore, `books/${post.id}`);
    return deleteDoc(bookDocRef);
  }

  public getPostImageRef(url: string): Observable<string | ArrayBuffer | null> {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFile(response))
      );
  }

  public readFile(blob: Blob): Observable<string | ArrayBuffer | null> {
    return new Observable((obs: { error: (arg0: ProgressEvent<FileReader>) => unknown; next: (arg0: string | ArrayBuffer | null) => unknown; complete: () => unknown; }) => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();
      const storage = getStorage();
      const storageRef = ref(storage, 'some-child');
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.table(snapshot);
      });

      return reader.readAsDataURL(blob);
    });
  }

  public async getArticlesFromFirebase(): Promise<PublishNotes[]> {
    return new Promise((resolve) => {
      const db = getDatabase();
      const starCountRef = dbref(db, '/');
      onValue(starCountRef, (snapshot) => {
        const userCreatedArticles = snapshot.val();
        if(userCreatedArticles) {
          const keys = Object.keys(userCreatedArticles);

          const temp: PublishNotes[] = [];
          keys.forEach((key: string, index: number) => {
              temp.push(userCreatedArticles[key])
              temp[index].id = key;
              if(index == keys.length - 1) {
                resolve(temp)
              }
          });
        }
      });
    })
  }

  public async getPublicationFromFirebase(id: string): Promise<PublishNotes> {
    return new Promise((resolve) => {
      const db = getDatabase();
      const starCountRef = dbref(db, '/' + id);
      onValue(starCountRef, (snapshot) => {
        const userCreatedArticles = snapshot.val();
        resolve(snapshot.val())
      });
    })
  }
}
