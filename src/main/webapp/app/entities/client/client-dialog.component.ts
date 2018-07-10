import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Client } from './client.model';
import { ClientPopupService } from './client-popup.service';
import { ClientService } from './client.service';
import { User, UserService } from '../../shared';
import { TypeClient, TypeClientService } from '../type-client';
import { Visite, VisiteService } from '../visite';
import {AgentImmobilier} from '../agent-immobilier/agent-immobilier.model';
import {AgentImmobilierService} from '../agent-immobilier/agent-immobilier.service';

@Component({
    selector: 'jhi-client-dialog',
    templateUrl: './client-dialog.component.html'
})
export class ClientDialogComponent implements OnInit {

    client: Client;
    isSaving: boolean;
    users: User[];
    authorities: any[];
    typeclients: TypeClient[];
    visites: Visite[];
    usersDispo: User[];
    num: number;
    listeIdUserClient: number [];
    listeidUserAgent: number [];
    listeIdUser: number [];
    agents: AgentImmobilier[];
    clients: Client[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientService: ClientService,
        private userService: UserService,
        private typeClientService: TypeClientService,
        private visiteService: VisiteService,
        private eventManager: JhiEventManager,
        private agentImmobilierService: AgentImmobilierService,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usersDispo = [];
        this.authorities = [];
        this.listeIdUserClient = [];
        this.listeidUserAgent = [];
        this.listeIdUser = [];
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {  this.users = res.body;
            this.agentImmobilierService.query().subscribe((res: HttpResponse<AgentImmobilier[]>) => {
                this.agents = res.body;
                this.clientService.query().subscribe((res: HttpResponse<Client[]>) => {
                    this.clients = res.body;
                    // sortir les id
                    for (let i = 0 ; i < this.clients.length ; i++){
                        this.listeIdUserClient.push(this.clients[i].user.id);
                    }
                    for (let i = 0 ; i < this.agents.length ; i++){
                        this.listeidUserAgent.push(this.agents[i].user.id);
                    }
                    for(let i = 0 ; i < this.users.length ; i++){
                        this.listeIdUser.push(this.users[i].id);
                    }
                    console.log('liste id user ' + this.listeIdUser);
                    // comparer les listes
                    let missingClient = this.listeIdUser.filter(item => this.listeIdUserClient.indexOf(item) < 0);
                    console.log(missingClient);
                    let missingAgent = this.listeIdUser.filter(item => this.listeidUserAgent.indexOf(item) < 0);
                    console.log(missingAgent);
                    let missingUser = missingClient.filter(item => missingAgent.indexOf(item) > 0);
                    console.log(missingUser);
                    let num = 0;
                    // aller recherche les users pour les mettre dans la liste
                    for (let y = 0 ; y < missingUser.length; y++){

                        this.userService.findUserById(missingUser[y]).subscribe((res: HttpResponse<User>) => {
                                console.log(num);
                                this.usersDispo[num] = res.body;
                                console.log(this.usersDispo[y].authorities);
                                num++;
                            }
                        );
                    }
                    console.log( this.usersDispo);
                    console.log(this.users);
                });
            });

            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.typeClientService.query()
            .subscribe((res: HttpResponse<TypeClient[]>) => { this.typeclients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.visiteService.query()
            .subscribe((res: HttpResponse<Visite[]>) => { this.visites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {

            this.subscribeToSaveResponse(
                this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(
                this.clientService.create(this.client));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Client>>) {
        result.subscribe((res: HttpResponse<Client>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Client) {
        this.eventManager.broadcast({ name: 'clientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackTypeClientById(index: number, item: TypeClient) {
        return item.id;
    }
    trackTypeClientByNom(index: number, item: TypeClient) {
        return item.nom;
    }

    trackVisiteById(index: number, item: Visite) {
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
    selector: 'jhi-client-popup',
    template: ''
})
export class ClientPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientPopupService: ClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientPopupService
                    .open(ClientDialogComponent as Component, params['id']);
            } else {
                this.clientPopupService
                    .open(ClientDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
