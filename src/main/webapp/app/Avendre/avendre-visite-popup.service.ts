import {Component, Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {BienService} from '../entities/bien/bien.service';
import {Router} from '@angular/router';
import {Visite, VisiteService} from '../entities/visite';
import {JhiAlertService} from 'ng-jhipster';

@Injectable()
export class AvendreVisitePopupService {

    private ngbModalRef: NgbModalRef;
    visites: Visite[];

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private visiteService: VisiteService,
        private bienService: BienService,
        private jhiAlertService: JhiAlertService

    ) {
        this.ngbModalRef = null;
    }
    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        console.log('open service');
    return new Promise<NgbModalRef>((resolve, reject) => {
    const isOpen = this.ngbModalRef !== null;
    if (isOpen) {
        resolve(this.ngbModalRef);
    }

        if (id) {
            this.visiteService.queryVisiteBien(id).subscribe((res: HttpResponse<Visite[]>) => {
                console.log('appel la fonction');
                const visite: Visite[] = res.body;
                this.visites = res.body;
                console.log(this.visites);
                console.log(visite);

                /*   if (visite.dateDebut) {
                       visite.dateDebut = {
                           year: visite.dateDebut.getFullYear(),
                           month: visite.dateDebut.getMonth() + 1,
                           day: visite.dateDebut.getDate()
                       };
                   }
                   if (visite.dateFin) {
                       visite.dateFin = {
                           year: visite.dateFin.getFullYear(),
                           month: visite.dateFin.getMonth() + 1,
                           day: visite.dateFin.getDate()
                       };
                   }*/
                this.ngbModalRef = this.visiteModalRef(component, visite);
                resolve(this.ngbModalRef);
            });
    } /*else {
    // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
    this.ngbModalRef = this.visiteModalRef(component, new Visite());
    resolve(this.ngbModalRef);
}, 0);
};*/
});
}

visiteModalRef(component: Component, visite: Visite []): NgbModalRef {
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
/*
    bienModalRef(component: Component, bien: Bien): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bien = bien;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
    }*/

}
