import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeClient } from './type-client.model';
import { TypeClientPopupService } from './type-client-popup.service';
import { TypeClientService } from './type-client.service';

@Component({
    selector: 'jhi-type-client-delete-dialog',
    templateUrl: './type-client-delete-dialog.component.html'
})
export class TypeClientDeleteDialogComponent {

    typeClient: TypeClient;

    constructor(
        private typeClientService: TypeClientService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeClientService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'typeClientListModification',
                content: 'Deleted an typeClient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-client-delete-popup',
    template: ''
})
export class TypeClientDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeClientPopupService: TypeClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.typeClientPopupService
                .open(TypeClientDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
