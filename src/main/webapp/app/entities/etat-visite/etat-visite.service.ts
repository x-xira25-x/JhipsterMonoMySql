import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EtatVisite } from './etat-visite.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EtatVisite>;

@Injectable()
export class EtatVisiteService {

    private resourceUrl =  SERVER_API_URL + 'api/etat-visites';

    constructor(private http: HttpClient) { }

    create(etatVisite: EtatVisite): Observable<EntityResponseType> {
        const copy = this.convert(etatVisite);
        return this.http.post<EtatVisite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(etatVisite: EtatVisite): Observable<EntityResponseType> {
        const copy = this.convert(etatVisite);
        return this.http.put<EtatVisite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EtatVisite>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EtatVisite[]>> {
        const options = createRequestOption(req);
        return this.http.get<EtatVisite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EtatVisite[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EtatVisite = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EtatVisite[]>): HttpResponse<EtatVisite[]> {
        const jsonResponse: EtatVisite[] = res.body;
        const body: EtatVisite[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EtatVisite.
     */
    private convertItemFromServer(etatVisite: EtatVisite): EtatVisite {
        const copy: EtatVisite = Object.assign({}, etatVisite);
        return copy;
    }

    /**
     * Convert a EtatVisite to a JSON which can be sent to the server.
     */
    private convert(etatVisite: EtatVisite): EtatVisite {
        const copy: EtatVisite = Object.assign({}, etatVisite);
        return copy;
    }
}
