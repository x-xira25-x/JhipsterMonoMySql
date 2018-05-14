import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisitePopupService } from './visite-popup.service';
import { VisiteService } from './visite.service';

@Component({
    selector: 'jhi-visite-delete-dialog',
    templateUrl: './visite-delete-dialog.component.html'
})
export class VisiteDeleteDialogComponent {

    visite: Visite;

    constructor(
        private visiteService: VisiteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.visiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'visiteListModification',
                content: 'Deleted an visite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-visite-delete-popup',
    template: ''
})
export class VisiteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.visitePopupService
                .open(VisiteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
