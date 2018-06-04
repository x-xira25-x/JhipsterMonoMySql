import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Visite } from './visite.model';
import { VisiteService } from './visite.service';

@Injectable()
export class VisitePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private visiteService: VisiteService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.visiteService.find(id)
                    .subscribe((visiteResponse: HttpResponse<Visite>) => {
                        const visite: Visite = visiteResponse.body;
                        visite.dateDebut = this.datePipe
                            .transform(visite.dateDebut, 'yyyy-MM-ddTHH:mm:ss');
                        visite.dateFin = this.datePipe
                            .transform(visite.dateFin, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.visiteModalRef(component, visite);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.visiteModalRef(component, new Visite());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    visiteModalRef(component: Component, visite: Visite): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.visite = visite;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
