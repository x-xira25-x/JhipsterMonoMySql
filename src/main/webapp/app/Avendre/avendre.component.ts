import { Component, OnInit } from '@angular/core';
import {Bien} from '../entities/bien/bien.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {BienService} from '../entities/bien/bien.service';
import {Principal} from '../shared';
import {Subscription} from 'rxjs/Subscription';
import {TypeBien, TypeBienService} from '../entities/type-bien';
import {AvendreVisiteService} from './avendre-visite.service';

@Component({
  selector: 'jhi-avendre',
  templateUrl: './avendre.component.html',
  styles: []
})
export class AvendreComponent implements OnInit {
    biens: Bien[];
    currentAccount: any;
    eventSubscriber: Subscription;
    bien: Bien;
    typebiens: TypeBien[];
    typebien: TypeBien;

  constructor(
      private bienService: BienService,
      private jhiAlertService: JhiAlertService,
      private dataUtils: JhiDataUtils,
      private eventManager: JhiEventManager,
      private principal: Principal,
      private typeBienService: TypeBienService,
      private avendreVisiteService: AvendreVisiteService,
  ) {

  }

    loadAll() {
        this.bienService.query().subscribe(
            (res: HttpResponse<Bien[]>) => {
                this.biens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        console.log(this.bien);
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.typeBienService.query()
            .subscribe((res: HttpResponse<TypeBien[]>) => { this.typebiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
       console.log('typeiben');
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
    trackTypeBienByNom(index: number, item: TypeBien) {
        return item.nom;
    }
    filtre() {
        this.avendreVisiteService.findBienByType(this.typebien.id).subscribe(
            (res: HttpResponse<Bien[]>) => {
                this.biens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

}
