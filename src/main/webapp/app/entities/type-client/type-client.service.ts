import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TypeClient } from './type-client.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TypeClient>;

@Injectable()
export class TypeClientService {

    private resourceUrl =  SERVER_API_URL + 'api/type-clients';

    constructor(private http: HttpClient) { }

    create(typeClient: TypeClient): Observable<EntityResponseType> {
        const copy = this.convert(typeClient);
        return this.http.post<TypeClient>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(typeClient: TypeClient): Observable<EntityResponseType> {
        const copy = this.convert(typeClient);
        return this.http.put<TypeClient>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TypeClient>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TypeClient[]>> {
        const options = createRequestOption(req);
        return this.http.get<TypeClient[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TypeClient[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TypeClient = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TypeClient[]>): HttpResponse<TypeClient[]> {
        const jsonResponse: TypeClient[] = res.body;
        const body: TypeClient[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TypeClient.
     */
    private convertItemFromServer(typeClient: TypeClient): TypeClient {
        const copy: TypeClient = Object.assign({}, typeClient);
        return copy;
    }

    /**
     * Convert a TypeClient to a JSON which can be sent to the server.
     */
    private convert(typeClient: TypeClient): TypeClient {
        const copy: TypeClient = Object.assign({}, typeClient);
        return copy;
    }
}
