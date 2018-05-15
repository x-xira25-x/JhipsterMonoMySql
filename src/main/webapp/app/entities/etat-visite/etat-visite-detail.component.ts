import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EtatVisite } from './etat-visite.model';
import { EtatVisiteService } from './etat-visite.service';

@Component({
    selector: 'jhi-etat-visite-detail',
    templateUrl: './etat-visite-detail.component.html'
})
export class EtatVisiteDetailComponent implements OnInit, OnDestroy {

    etatVisite: EtatVisite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private etatVisiteService: EtatVisiteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEtatVisites();
    }

    load(id) {
        this.etatVisiteService.find(id)
            .subscribe((etatVisiteResponse: HttpResponse<EtatVisite>) => {
                this.etatVisite = etatVisiteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEtatVisites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'etatVisiteListModification',
            (response) => this.load(this.etatVisite.id)
        );
    }
}
