import { Injectable } from '@angular/core';
import {Bien} from '../entities/bien/bien.model';
import {EntityResponseType} from '../entities/bien/bien.service';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JhiDateUtils} from 'ng-jhipster';
import {createRequestOption} from '../shared';
import {Visite} from '../entities/visite/visite.model';

@Injectable()
export class AvendreVisiteService {

    private resourceUrl =  SERVER_API_URL + 'api/biens';

  constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    findBienByType(idTypeBien: number):  Observable<HttpResponse<Bien[]>> {
        const options = createRequestOption(idTypeBien);
        return this.http.get<Bien[]>(`http://localhost:8080/api/biens/${idTypeBien}/typeBien`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bien[]>) => this.convertArrayResponse(res));
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
