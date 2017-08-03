import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
export class AuthService {
    user: Observable<firebase.User>;
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor() {}
 

}