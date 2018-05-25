import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Bien } from './bien.model';
import { BienPopupService } from './bien-popup.service';
import { BienService } from './bien.service';
import { TypeBien, TypeBienService } from '../type-bien';
import { Client, ClientService } from '../client';
import { EtatBien, EtatBienService } from '../etat-bien';

@Component({
    selector: 'jhi-bien-dialog',
    templateUrl: './bien-dialog.component.html'
})
export class BienDialogComponent implements OnInit {

    bien: Bien;
    isSaving: boolean;

    typebiens: TypeBien[];

    clients: Client[];

    etatbiens: EtatBien[];
    anneeConstructionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bienService: BienService,
        private typeBienService: TypeBienService,
        private clientService: ClientService,
        private etatBienService: EtatBienService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.typeBienService.query()
            .subscribe((res: HttpResponse<TypeBien[]>) => { this.typebiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.etatBienService.query()
            .subscribe((res: HttpResponse<EtatBien[]>) => { this.etatbiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.bien, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bienService.update(this.bien));
        } else {
            this.subscribeToSaveResponse(
                this.bienService.create(this.bien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bien>>) {
        result.subscribe((res: HttpResponse<Bien>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bien) {
        this.eventManager.broadcast({ name: 'bienListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTypeBienById(index: number, item: TypeBien) {
        return item.id;
    }
    trackTypeBienByNom(index: number, item: TypeBien) {
        return item.nom;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackEtatBienById(index: number, item: EtatBien) {
        return item.id;
    }
    trackEtatBienByNom(index: number, item: EtatBien) {
        return item.nom;
    }
}

@Component({
    selector: 'jhi-bien-popup',
    template: ''
})
export class BienPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bienPopupService: BienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bienPopupService
                    .open(BienDialogComponent as Component, params['id']);
            } else {
                this.bienPopupService
                    .open(BienDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
