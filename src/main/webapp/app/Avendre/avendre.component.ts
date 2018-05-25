import { Component, OnInit } from '@angular/core';
import {Bien} from "../entities/bien/bien.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {BienService} from "../entities/bien/bien.service";
import {Principal} from "../shared";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'jhi-avendre',
  templateUrl: './avendre.component.html',
  styles: []
})
export class AvendreComponent implements OnInit {
    biens: Bien[];
    currentAccount: any;
    eventSubscriber: Subscription;

  constructor(
      private bienService: BienService,
      private jhiAlertService: JhiAlertService,
      private dataUtils: JhiDataUtils,
      private eventManager: JhiEventManager,
      private principal: Principal
  ) {

  }

    loadAll() {
        this.bienService.query().subscribe(
            (res: HttpResponse<Bien[]>) => {
                this.biens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        console.log("load")
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBiens();
    }
    registerChangeInBiens() {
        this.eventSubscriber = this.eventManager.subscribe('bienListModification', (response) => this.loadAll());
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
