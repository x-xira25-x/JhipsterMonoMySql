import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisitePopupService } from './visite-popup.service';
import { VisiteService } from './visite.service';

@Component({
    selector: 'jhi-visite-dialog',
    templateUrl: './visite-dialog.component.html'
})
export class VisiteDialogComponent implements OnInit {

    visite: Visite;
    isSaving: boolean;
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private visiteService: VisiteService,
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
        if (this.visite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.visiteService.update(this.visite));
        } else {
            this.subscribeToSaveResponse(
                this.visiteService.create(this.visite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Visite>>) {
        result.subscribe((res: HttpResponse<Visite>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Visite) {
        this.eventManager.broadcast({ name: 'visiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-visite-popup',
    template: ''
})
export class VisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component, params['id']);
            } else {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
