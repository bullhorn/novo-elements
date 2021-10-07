// NG2
import { HttpClient } from '@angular/common/http';
import { AppBridge } from '@bullhorn/connect';

export class DevAppBridgeService {
  constructor(private http: HttpClient) {}
  create(name: string) {
    return new DevAppBridge(name, this.http);
  }
}

export class DevAppBridge extends AppBridge {
  private baseURL: string;

  constructor(traceName: string = 'DevAppBridge', private http: HttpClient) {
    super(traceName);
    const cookie = this.getCookie('UlEncodedIdentity');
    if (cookie && cookie.length) {
      const identity = JSON.parse(decodeURIComponent(cookie));
      const endpoints = identity.sessions.reduce((obj, session) => {
        obj[session.name] = session.value.endpoint;
        return obj;
      }, {});
      this.baseURL = endpoints.rest;
    }
  }
  protected _setupHandlers(): void {}

  /**
   * Fires or responds to an HTTP_GET event
   * @param packet any - packet of data to send with the event
   */
  public httpGET(relativeURL: string): Promise<any> {
    return this.http.get(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_POST event
   * @param packet any - packet of data to send with the event
   */
  public httpPOST(relativeURL: string, postData: any): Promise<any> {
    return this.http.post(`${this.baseURL}/${relativeURL}`, postData, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_PUT event
   * @param packet any - packet of data to send with the event
   */
  public httpPUT(relativeURL: string, putData: any): Promise<any> {
    return this.http.put(`${this.baseURL}/${relativeURL}`, putData, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_DELETE event
   * @param packet any - packet of data to send with the event
   */
  public httpDELETE(relativeURL: string): Promise<any> {
    return this.http.delete(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
  }

  private getCookie(cname: string): any {
    if (document) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
    }
    return false;
  }
}
