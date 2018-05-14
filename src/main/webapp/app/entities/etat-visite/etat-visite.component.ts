import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EtatVisite } from './etat-visite.model';
import { EtatVisiteService } from './etat-visite.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-etat-visite',
    templateUrl: './etat-visite.component.html'
})
export class EtatVisiteComponent implements OnInit, OnDestroy {
etatVisites: EtatVisite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private etatVisiteService: EtatVisiteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.etatVisiteService.query().subscribe(
            (res: HttpResponse<EtatVisite[]>) => {
                this.etatVisites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEtatVisites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EtatVisite) {
        return item.id;
    }
    registerChangeInEtatVisites() {
        this.eventSubscriber = this.eventManager.subscribe('etatVisiteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
