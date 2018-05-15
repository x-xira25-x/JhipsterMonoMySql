import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtatVisite } from './etat-visite.model';
import { EtatVisitePopupService } from './etat-visite-popup.service';
import { EtatVisiteService } from './etat-visite.service';

@Component({
    selector: 'jhi-etat-visite-dialog',
    templateUrl: './etat-visite-dialog.component.html'
})
export class EtatVisiteDialogComponent implements OnInit {

    etatVisite: EtatVisite;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private etatVisiteService: EtatVisiteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.etatVisite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etatVisiteService.update(this.etatVisite));
        } else {
            this.subscribeToSaveResponse(
                this.etatVisiteService.create(this.etatVisite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EtatVisite>>) {
        result.subscribe((res: HttpResponse<EtatVisite>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EtatVisite) {
        this.eventManager.broadcast({ name: 'etatVisiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-etat-visite-popup',
    template: ''
})
export class EtatVisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatVisitePopupService: EtatVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etatVisitePopupService
                    .open(EtatVisiteDialogComponent as Component, params['id']);
            } else {
                this.etatVisitePopupService
                    .open(EtatVisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
