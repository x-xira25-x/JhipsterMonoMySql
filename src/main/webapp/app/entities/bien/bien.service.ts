import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Bien } from './bien.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Bien>;

@Injectable()
export class BienService {

    private resourceUrl =  SERVER_API_URL + 'api/biens';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bien: Bien): Observable<EntityResponseType> {
        const copy = this.convert(bien);
        return this.http.post<Bien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bien: Bien): Observable<EntityResponseType> {
        const copy = this.convert(bien);
        return this.http.put<Bien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bien>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Bien[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bien[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bien[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bien = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Bien[]>): HttpResponse<Bien[]> {
        const jsonResponse: Bien[] = res.body;
        const body: Bien[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bien.
     */
    private convertItemFromServer(bien: Bien): Bien {
        const copy: Bien = Object.assign({}, bien);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateFromServer(bien.anneeConstruction);
        return copy;
    }

    /**
     * Convert a Bien to a JSON which can be sent to the server.
     */
    private convert(bien: Bien): Bien {
        const copy: Bien = Object.assign({}, bien);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateToServer(bien.anneeConstruction);
        return copy;
    }
}
