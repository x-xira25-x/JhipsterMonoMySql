import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Client } from './client.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Client>;

@Injectable()
export class ClientService {

    private resourceUrl =  SERVER_API_URL + 'api/clients';

    constructor(private http: HttpClient) { }

    create(client: Client): Observable<EntityResponseType> {
        const copy = this.convert(client);
        return this.http.post<Client>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(client: Client): Observable<EntityResponseType> {
        const copy = this.convert(client);
        return this.http.put<Client>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Client>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Client[]>> {
        const options = createRequestOption(req);
        return this.http.get<Client[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Client[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Client = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Client[]>): HttpResponse<Client[]> {
        const jsonResponse: Client[] = res.body;
        const body: Client[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Client.
     */
    private convertItemFromServer(client: Client): Client {
        const copy: Client = Object.assign({}, client);
        return copy;
    }

    /**
     * Convert a Client to a JSON which can be sent to the server.
     */
    private convert(client: Client): Client {
        const copy: Client = Object.assign({}, client);
        return copy;
    }
}
