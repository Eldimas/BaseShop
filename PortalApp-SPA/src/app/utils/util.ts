import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

export function createHttpObservable(url: string): any {

    
    const token = localStorage.getItem('token');
    return Observable.create(observer => {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
           
            return response.json();
        }).then(body => {
            observer.next(body);
            observer.complete();
        }).catch(err => {
            observer.error(err);
        });
    });
}
