import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AgentImmobilier } from './agent-immobilier.model';
import { AgentImmobilierService } from './agent-immobilier.service';

@Component({
    selector: 'jhi-agent-immobilier-detail',
    templateUrl: './agent-immobilier-detail.component.html'
})
export class AgentImmobilierDetailComponent implements OnInit, OnDestroy {

    agentImmobilier: AgentImmobilier;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private agentImmobilierService: AgentImmobilierService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAgentImmobiliers();
    }

    load(id) {
        this.agentImmobilierService.find(id)
            .subscribe((agentImmobilierResponse: HttpResponse<AgentImmobilier>) => {
                this.agentImmobilier = agentImmobilierResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAgentImmobiliers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'agentImmobilierListModification',
            (response) => this.load(this.agentImmobilier.id)
        );
    }
}
