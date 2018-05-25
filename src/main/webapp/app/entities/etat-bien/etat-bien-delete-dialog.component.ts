import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtatBien } from './etat-bien.model';
import { EtatBienPopupService } from './etat-bien-popup.service';
import { EtatBienService } from './etat-bien.service';

@Component({
    selector: 'jhi-etat-bien-delete-dialog',
    templateUrl: './etat-bien-delete-dialog.component.html'
})
export class EtatBienDeleteDialogComponent {

    etatBien: EtatBien;

    constructor(
        private etatBienService: EtatBienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etatBienService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'etatBienListModification',
                content: 'Deleted an etatBien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etat-bien-delete-popup',
    template: ''
})
export class EtatBienDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatBienPopupService: EtatBienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.etatBienPopupService
                .open(EtatBienDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
