import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtatVisite } from './etat-visite.model';
import { EtatVisitePopupService } from './etat-visite-popup.service';
import { EtatVisiteService } from './etat-visite.service';

@Component({
    selector: 'jhi-etat-visite-delete-dialog',
    templateUrl: './etat-visite-delete-dialog.component.html'
})
export class EtatVisiteDeleteDialogComponent {

    etatVisite: EtatVisite;

    constructor(
        private etatVisiteService: EtatVisiteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etatVisiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'etatVisiteListModification',
                content: 'Deleted an etatVisite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etat-visite-delete-popup',
    template: ''
})
export class EtatVisiteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etatVisitePopupService: EtatVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.etatVisitePopupService
                .open(EtatVisiteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
