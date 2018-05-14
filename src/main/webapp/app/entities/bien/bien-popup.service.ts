import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Bien } from './bien.model';
import { BienService } from './bien.service';

@Injectable()
export class BienPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bienService: BienService

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
                this.bienService.find(id)
                    .subscribe((bienResponse: HttpResponse<Bien>) => {
                        const bien: Bien = bienResponse.body;
                        if (bien.anneeConstruction) {
                            bien.anneeConstruction = {
                                year: bien.anneeConstruction.getFullYear(),
                                month: bien.anneeConstruction.getMonth() + 1,
                                day: bien.anneeConstruction.getDate()
                            };
                        }
                        this.ngbModalRef = this.bienModalRef(component, bien);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bienModalRef(component, new Bien());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bienModalRef(component: Component, bien: Bien): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bien = bien;
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
