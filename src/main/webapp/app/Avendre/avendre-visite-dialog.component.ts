import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BienPopupService} from '../entities/bien/bien-popup.service';
import {BienDialogComponent, BienPopupComponent} from '../entities/bien/bien-dialog.component';
import {AvendreVisitePopupService} from './avendre-visite-popup.service';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {Client, ClientService} from '../entities/client';
import {BienService} from '../entities/bien/bien.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TypeBien, TypeBienService} from '../entities/type-bien';
import {EtatBien, EtatBienService} from '../entities/etat-bien';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Bien} from '../entities/bien/bien.model';
import {Principal} from '../shared';
import {Visite, VisiteService} from '../entities/visite';

@Component({
  selector: 'jhi-avendre-visite-dialog',
  templateUrl: './avendre-visite-dialog.component.html',
  styles: []
})
export class AvendreVisiteDialogComponent implements OnInit {

    bien: Bien;
    isSaving: boolean;
    typebiens: TypeBien[];
    client: Client;
    clients: Client[];
    settingsAccount: any;
    etatbiens: EtatBien[];
    visite: Visite;
    success: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bienService: BienService,
        private typeBienService: TypeBienService,
        private clientService: ClientService,
        private etatBienService: EtatBienService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private visiteService: VisiteService
    ) {
    }
    ngOnInit() {
        this.success = false;
        console.log(this.success);
        this.isSaving = false;
        this.typeBienService.query()
            .subscribe((res: HttpResponse<TypeBien[]>) => { this.typebiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.etatBienService.query()
            .subscribe((res: HttpResponse<EtatBien[]>) => { this.etatbiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    inscription(idVisite) {
        // récupérer le client
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.clientService.findIdClient(this.settingsAccount.login).subscribe(
                (res: HttpResponse<Client>) => {
                    this.client = res.body;
                    console.log('client' + this.client.id);
                    // essayer de récupérer la visite et mettre le client dedans
                    this.visiteService.find(idVisite).subscribe(
                        (res: HttpResponse<Visite>) => {
                            this.visite = res.body;
                         // ajout du client dans visite.client
                            this.visite.clients[this.visite.clients.length + 1] = this.client;
                            this.visiteService.updateSansConvert(this.visite).subscribe(
                                (res: HttpResponse<Visite>) => {
                                    this.visite = res.body;
                                    console.log('update visite');
                                    console.log(this.success);
                                },
                                (res: HttpErrorResponse) => this.onError(res.message)
                            );
                           // window.location.reload(false);
                            this.success = true;
                        });
                    /*   this.bienService.ajoutClientVisite(idVisite,this.client.id).subscribe(
                           (res: HttpResponse<Visite>) => {
                               this.visite = res.body;
                           },
                           (res: HttpErrorResponse) => this.onError(res.message)
                       );*/
                });
        });
    }
    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-avendreVisite-popup',
    template: ''
})
    export class avendreVisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private avendreVisitePopupService: AvendreVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            console.log('ngninit dans avendrevisitedialogcomponsent');
            if ( params['id'] ) {
                this.avendreVisitePopupService
                    .open(AvendreVisiteDialogComponent as Component, params['id']);
            } else {
                this.avendreVisitePopupService
                    .open(AvendreVisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
