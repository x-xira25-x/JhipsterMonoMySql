import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EtatBien } from './etat-bien.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EtatBien>;

@Injectable()
export class EtatBienService {

    private resourceUrl =  SERVER_API_URL + 'api/etat-biens';

    constructor(private http: HttpClient) { }

    create(etatBien: EtatBien): Observable<EntityResponseType> {
        const copy = this.convert(etatBien);
        return this.http.post<EtatBien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(etatBien: EtatBien): Observable<EntityResponseType> {
        const copy = this.convert(etatBien);
        return this.http.put<EtatBien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EtatBien>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EtatBien[]>> {
        const options = createRequestOption(req);
        return this.http.get<EtatBien[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EtatBien[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EtatBien = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EtatBien[]>): HttpResponse<EtatBien[]> {
        const jsonResponse: EtatBien[] = res.body;
        const body: EtatBien[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EtatBien.
     */
    private convertItemFromServer(etatBien: EtatBien): EtatBien {
        const copy: EtatBien = Object.assign({}, etatBien);
        return copy;
    }

    /**
     * Convert a EtatBien to a JSON which can be sent to the server.
     */
    private convert(etatBien: EtatBien): EtatBien {
        const copy: EtatBien = Object.assign({}, etatBien);
        return copy;
    }
}
