import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EtatBien } from './etat-bien.model';
import { EtatBienService } from './etat-bien.service';

@Component({
    selector: 'jhi-etat-bien-detail',
    templateUrl: './etat-bien-detail.component.html'
})
export class EtatBienDetailComponent implements OnInit, OnDestroy {

    etatBien: EtatBien;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private etatBienService: EtatBienService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEtatBiens();
    }

    load(id) {
        this.etatBienService.find(id)
            .subscribe((etatBienResponse: HttpResponse<EtatBien>) => {
                this.etatBien = etatBienResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEtatBiens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'etatBienListModification',
            (response) => this.load(this.etatBien.id)
        );
    }
}
