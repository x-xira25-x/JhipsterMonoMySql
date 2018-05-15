import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TypeClient } from './type-client.model';
import { TypeClientPopupService } from './type-client-popup.service';
import { TypeClientService } from './type-client.service';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-type-client-dialog',
    templateUrl: './type-client-dialog.component.html'
})
export class TypeClientDialogComponent implements OnInit {

    typeClient: TypeClient;
    isSaving: boolean;

    clients: Client[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private typeClientService: TypeClientService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.typeClient.id !== undefined) {
            this.subscribeToSaveResponse(
                this.typeClientService.update(this.typeClient));
        } else {
            this.subscribeToSaveResponse(
                this.typeClientService.create(this.typeClient));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TypeClient>>) {
        result.subscribe((res: HttpResponse<TypeClient>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TypeClient) {
        this.eventManager.broadcast({ name: 'typeClientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-type-client-popup',
    template: ''
})
export class TypeClientPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeClientPopupService: TypeClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeClientPopupService
                    .open(TypeClientDialogComponent as Component, params['id']);
            } else {
                this.typeClientPopupService
                    .open(TypeClientDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
