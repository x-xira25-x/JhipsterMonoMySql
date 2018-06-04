import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisitePopupService } from './visite-popup.service';
import { VisiteService } from './visite.service';
import { EtatVisite, EtatVisiteService } from '../etat-visite';
import { Bien, BienService } from '../bien';
import { AgentImmobilier, AgentImmobilierService } from '../agent-immobilier';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-visite-dialog',
    templateUrl: './visite-dialog.component.html'
})
export class VisiteDialogComponent implements OnInit {

    visite: Visite;
    isSaving: boolean;

    etatvisites: EtatVisite[];

    biens: Bien[];

    agentimmobiliers: AgentImmobilier[];

    clients: Client[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private visiteService: VisiteService,
        private etatVisiteService: EtatVisiteService,
        private bienService: BienService,
        private agentImmobilierService: AgentImmobilierService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.etatVisiteService.query()
            .subscribe((res: HttpResponse<EtatVisite[]>) => { this.etatvisites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bienService.query()
            .subscribe((res: HttpResponse<Bien[]>) => { this.biens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.agentImmobilierService.query()
            .subscribe((res: HttpResponse<AgentImmobilier[]>) => { this.agentimmobiliers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEtatVisiteById(index: number, item: EtatVisite) {
        return item.id;
    }

    trackBienById(index: number, item: Bien) {
        return item.id;
    }

    trackAgentImmobilierById(index: number, item: AgentImmobilier) {
        return item.id;
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
