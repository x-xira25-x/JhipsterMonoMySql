import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EtatBien } from './etat-bien.model';
import { EtatBienService } from './etat-bien.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-etat-bien',
    templateUrl: './etat-bien.component.html'
})
export class EtatBienComponent implements OnInit, OnDestroy {
etatBiens: EtatBien[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private etatBienService: EtatBienService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.etatBienService.query().subscribe(
            (res: HttpResponse<EtatBien[]>) => {
                this.etatBiens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEtatBiens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EtatBien) {
        return item.id;
    }
    registerChangeInEtatBiens() {
        this.eventSubscriber = this.eventManager.subscribe('etatBienListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
