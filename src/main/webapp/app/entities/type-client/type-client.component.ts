import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TypeClient } from './type-client.model';
import { TypeClientService } from './type-client.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-type-client',
    templateUrl: './type-client.component.html'
})
export class TypeClientComponent implements OnInit, OnDestroy {
typeClients: TypeClient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private typeClientService: TypeClientService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.typeClientService.query().subscribe(
            (res: HttpResponse<TypeClient[]>) => {
                this.typeClients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TypeClient) {
        return item.id;
    }
    registerChangeInTypeClients() {
        this.eventSubscriber = this.eventManager.subscribe('typeClientListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
