import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TypeBien } from './type-bien.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TypeBien>;

@Injectable()
export class TypeBienService {

    private resourceUrl =  SERVER_API_URL + 'api/type-biens';

    constructor(private http: HttpClient) { }

    create(typeBien: TypeBien): Observable<EntityResponseType> {
        const copy = this.convert(typeBien);
        return this.http.post<TypeBien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(typeBien: TypeBien): Observable<EntityResponseType> {
        const copy = this.convert(typeBien);
        return this.http.put<TypeBien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TypeBien>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TypeBien[]>> {
        const options = createRequestOption(req);
        return this.http.get<TypeBien[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TypeBien[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TypeBien = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TypeBien[]>): HttpResponse<TypeBien[]> {
        const jsonResponse: TypeBien[] = res.body;
        const body: TypeBien[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TypeBien.
     */
    private convertItemFromServer(typeBien: TypeBien): TypeBien {
        const copy: TypeBien = Object.assign({}, typeBien);
        return copy;
    }

    /**
     * Convert a TypeBien to a JSON which can be sent to the server.
     */
    private convert(typeBien: TypeBien): TypeBien {
        const copy: TypeBien = Object.assign({}, typeBien);
        return copy;
    }
}
