import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Visite } from './visite.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Visite>;

@Injectable()
export class VisiteService {

    private resourceUrl =  SERVER_API_URL + 'api/visites';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(visite: Visite): Observable<EntityResponseType> {
        const copy = this.convert(visite);
        return this.http.post<Visite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(visite: Visite): Observable<EntityResponseType> {
        const copy = this.convert(visite);
        return this.http.put<Visite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Visite>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Visite[]>> {
        const options = createRequestOption(req);
        return this.http.get<Visite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Visite[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Visite = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Visite[]>): HttpResponse<Visite[]> {
        const jsonResponse: Visite[] = res.body;
        const body: Visite[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Visite.
     */
    private convertItemFromServer(visite: Visite): Visite {
        const copy: Visite = Object.assign({}, visite);
        copy.dateDebut = this.dateUtils
            .convertLocalDateFromServer(visite.dateDebut);
        copy.dateFin = this.dateUtils
            .convertLocalDateFromServer(visite.dateFin);
        return copy;
    }

    /**
     * Convert a Visite to a JSON which can be sent to the server.
     */
    private convert(visite: Visite): Visite {
        const copy: Visite = Object.assign({}, visite);
        copy.dateDebut = this.dateUtils
            .convertLocalDateToServer(visite.dateDebut);
        copy.dateFin = this.dateUtils
            .convertLocalDateToServer(visite.dateFin);
        return copy;
    }
}
