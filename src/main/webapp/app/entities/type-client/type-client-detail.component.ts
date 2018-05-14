import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TypeClient } from './type-client.model';
import { TypeClientService } from './type-client.service';

@Component({
    selector: 'jhi-type-client-detail',
    templateUrl: './type-client-detail.component.html'
})
export class TypeClientDetailComponent implements OnInit, OnDestroy {

    typeClient: TypeClient;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private typeClientService: TypeClientService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTypeClients();
    }

    load(id) {
        this.typeClientService.find(id)
            .subscribe((typeClientResponse: HttpResponse<TypeClient>) => {
                this.typeClient = typeClientResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTypeClients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeClientListModification',
            (response) => this.load(this.typeClient.id)
        );
    }
}
