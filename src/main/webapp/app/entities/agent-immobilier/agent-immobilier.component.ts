import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AgentImmobilier } from './agent-immobilier.model';
import { AgentImmobilierService } from './agent-immobilier.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-agent-immobilier',
    templateUrl: './agent-immobilier.component.html'
})
export class AgentImmobilierComponent implements OnInit, OnDestroy {
agentImmobiliers: AgentImmobilier[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agentImmobilierService: AgentImmobilierService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.agentImmobilierService.query().subscribe(
            (res: HttpResponse<AgentImmobilier[]>) => {
                this.agentImmobiliers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAgentImmobiliers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AgentImmobilier) {
        return item.id;
    }
    registerChangeInAgentImmobiliers() {
        this.eventSubscriber = this.eventManager.subscribe('agentImmobilierListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
