import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Client } from './client.model';
import { ClientService } from './client.service';

@Component({
    selector: 'jhi-client-detail',
    templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit, OnDestroy {

    client: Client;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientService: ClientService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClients();
    }

    load(id) {
        this.clientService.find(id)
            .subscribe((clientResponse: HttpResponse<Client>) => {
                this.client = clientResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientListModification',
            (response) => this.load(this.client.id)
        );
    }
}
