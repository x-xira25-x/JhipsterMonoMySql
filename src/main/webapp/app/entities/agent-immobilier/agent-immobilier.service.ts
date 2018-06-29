import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AgentImmobilier } from './agent-immobilier.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AgentImmobilier>;

@Injectable()
export class AgentImmobilierService {

    private resourceUrl =  SERVER_API_URL + 'api/agent-immobiliers';

    constructor(private http: HttpClient) { }

    create(agentImmobilier: AgentImmobilier): Observable<EntityResponseType> {
        const copy = this.convert(agentImmobilier);
        return this.http.post<AgentImmobilier>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(agentImmobilier: AgentImmobilier): Observable<EntityResponseType> {
        const copy = this.convert(agentImmobilier);
        return this.http.put<AgentImmobilier>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AgentImmobilier>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    // ajout méthode qui retourne du client par login
    findIdAgentImmobilier(id: number): Observable<EntityResponseType> {
        return this.http.get<AgentImmobilier>(`http://localhost:8080/api/agent-immobiliers/IdUser/${id}`, {observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AgentImmobilier[]>> {
        const options = createRequestOption(req);
        return this.http.get<AgentImmobilier[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AgentImmobilier[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AgentImmobilier = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AgentImmobilier[]>): HttpResponse<AgentImmobilier[]> {
        const jsonResponse: AgentImmobilier[] = res.body;
        const body: AgentImmobilier[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AgentImmobilier.
     */
    private convertItemFromServer(agentImmobilier: AgentImmobilier): AgentImmobilier {
        const copy: AgentImmobilier = Object.assign({}, agentImmobilier);
        return copy;
    }

    /**
     * Convert a AgentImmobilier to a JSON which can be sent to the server.
     */
    private convert(agentImmobilier: AgentImmobilier): AgentImmobilier {
        const copy: AgentImmobilier = Object.assign({}, agentImmobilier);
        return copy;
    }
}
