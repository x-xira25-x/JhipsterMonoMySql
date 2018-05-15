import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TypeBien } from './type-bien.model';
import { TypeBienService } from './type-bien.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-type-bien',
    templateUrl: './type-bien.component.html'
})
export class TypeBienComponent implements OnInit, OnDestroy {
typeBiens: TypeBien[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private typeBienService: TypeBienService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.typeBienService.query().subscribe(
            (res: HttpResponse<TypeBien[]>) => {
                this.typeBiens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeBiens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TypeBien) {
        return item.id;
    }
    registerChangeInTypeBiens() {
        this.eventSubscriber = this.eventManager.subscribe('typeBienListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
