import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    images: Array<string>;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private _http: HttpClient
    ) {
    }
    private _randomImageUrls(images: Array<{id: number}>): Array<string> {
        return [1, 2, 3].map(() => {
            const randomId = images[Math.floor(Math.random() * images.length)].id;
            return `https://picsum.photos/900/500?image=${randomId}`;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this._http.get('https://picsum.photos/list')
            .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
            .subscribe(images => this.images = images);
    }


    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
