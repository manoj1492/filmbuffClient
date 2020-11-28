import { Injectable, OnDestroy } from '@angular/core';
import { Message, Client, over , Subscription} from 'webstomp-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketClientState } from '../models/socketclientstate';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { filter, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy {

  private client: Client;
  private state: BehaviorSubject<SocketClientState>;

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

  static textHandler(message: Message): string {
    return message.body;
  }

  constructor() {
    this.client = over(new SockJS(environment.websocketapi));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    });
  }
  ngOnDestroy() {
    this.connect().pipe(first()).subscribe(client => client.disconnect(null));
  }

  private connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  onMessage(topic: string, handler = SocketClientService.jsonHandler): Observable<any> {
    return this.connect().pipe(first(), switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: Subscription = client.subscribe(topic, message => {
          observer.next(handler(message));
        });
        return () => client.unsubscribe(subscription.id);
      });
    }));
  }

  onPlainMessage(topic: string): Observable<string> {
    return this.onMessage(topic, SocketClientService.textHandler);
  }
}
