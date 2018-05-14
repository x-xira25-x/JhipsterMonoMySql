import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeBien } from './type-bien.model';
import { TypeBienPopupService } from './type-bien-popup.service';
import { TypeBienService } from './type-bien.service';

@Component({
    selector: 'jhi-type-bien-delete-dialog',
    templateUrl: './type-bien-delete-dialog.component.html'
})
export class TypeBienDeleteDialogComponent {

    typeBien: TypeBien;

    constructor(
        private typeBienService: TypeBienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeBienService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'typeBienListModification',
                content: 'Deleted an typeBien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-bien-delete-popup',
    template: ''
})
export class TypeBienDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeBienPopupService: TypeBienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.typeBienPopupService
                .open(TypeBienDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
