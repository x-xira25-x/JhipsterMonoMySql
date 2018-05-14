import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisiteService } from './visite.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-visite',
    templateUrl: './visite.component.html'
})
export class VisiteComponent implements OnInit, OnDestroy {
visites: Visite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private visiteService: VisiteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.visiteService.query().subscribe(
            (res: HttpResponse<Visite[]>) => {
                this.visites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVisites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Visite) {
        return item.id;
    }
    registerChangeInVisites() {
        this.eventSubscriber = this.eventManager.subscribe('visiteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
