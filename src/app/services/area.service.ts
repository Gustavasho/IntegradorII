import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, take } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


@Injectable({
    providedIn: 'root'
})
export class AreaService {

    readonly API = `${environment.api}/area`;

    constructor(
        private http: HttpClient
    ) { }

    save(objeto: any) {
        return this.http.post(`${this.API}`, objeto).pipe(take(1));
    }

    list() {
        return this.http.get(`${this.API}/`)
            .pipe(
                map((f: any) => ({ data: f.data }))
            );
    }

    update(objetoId: string = '', objeto: any) {
        return this.http.put(`${this.API}/id/${objetoId}`, objeto)
            .pipe(
                take(1),
                map((f: any) => ({ data: f.data }))
            );
    }

    delete(objetoId: string = '') {
        return this.http.delete(`${this.API}/id/${objetoId}`)
            .pipe(take(1));
    }

}