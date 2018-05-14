import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AgentImmobilier } from './agent-immobilier.model';
import { AgentImmobilierPopupService } from './agent-immobilier-popup.service';
import { AgentImmobilierService } from './agent-immobilier.service';

@Component({
    selector: 'jhi-agent-immobilier-delete-dialog',
    templateUrl: './agent-immobilier-delete-dialog.component.html'
})
export class AgentImmobilierDeleteDialogComponent {

    agentImmobilier: AgentImmobilier;

    constructor(
        private agentImmobilierService: AgentImmobilierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agentImmobilierService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'agentImmobilierListModification',
                content: 'Deleted an agentImmobilier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agent-immobilier-delete-popup',
    template: ''
})
export class AgentImmobilierDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agentImmobilierPopupService: AgentImmobilierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.agentImmobilierPopupService
                .open(AgentImmobilierDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
