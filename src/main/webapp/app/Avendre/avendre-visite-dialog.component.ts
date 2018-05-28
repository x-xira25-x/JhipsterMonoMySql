import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BienPopupService} from "../entities/bien/bien-popup.service";
import {BienDialogComponent, BienPopupComponent} from "../entities/bien/bien-dialog.component";
import {AvendreVisitePopupService} from "./avendre-visite-popup.service";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {Client, ClientService} from "../entities/client";
import {BienService} from "../entities/bien/bien.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TypeBien, TypeBienService} from "../entities/type-bien";
import {EtatBien, EtatBienService} from "../entities/etat-bien";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Bien} from "../entities/bien/bien.model";

@Component({
  selector: 'jhi-avendre-visite-dialog',
  templateUrl: './avendre-visite-dialog.component.html',
  styles: []
})
export class AvendreVisiteDialogComponent implements OnInit {

    bien: Bien;
    isSaving: boolean;

    typebiens: TypeBien[];

    clients: Client[];

    etatbiens: EtatBien[];

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
            console.log("ngninit dans avendrevisitedialogcomponsent")
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
