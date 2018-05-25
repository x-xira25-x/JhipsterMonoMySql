import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtatBien } from './etat-bien.model';
import { EtatBienPopupService } from './etat-bien-popup.service';
import { EtatBienService } from './etat-bien.service';

@Component({
    selector: 'jhi-etat-bien-dialog',
    templateUrl: './etat-bien-dialog.component.html'
})
export class EtatBienDialogComponent implements OnInit {

    etatBien: EtatBien;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private etatBienService: EtatBienService,
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
        if (this.etatBien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etatBienService.update(this.etatBien));
        } else {
            this.subscribeToSaveResponse(
                this.etatBienService.create(this.etatBien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EtatBien>>) {
        result.subscribe((res: HttpResponse<EtatBien>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EtatBien) {
        this.eventManager.broadcast({ name: 'etatBienListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-etat-bien-popup',
    template: ''
})
export class EtatBienPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatBienPopupService: EtatBienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etatBienPopupService
                    .open(EtatBienDialogComponent as Component, params['id']);
            } else {
                this.etatBienPopupService
                    .open(EtatBienDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
