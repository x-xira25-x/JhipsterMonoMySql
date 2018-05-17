import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Register } from './register.service';
import {LoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE, UserService} from '../../shared';
import {Client, ClientService} from "../../entities/client";

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    client: Client;

    constructor(
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private clientService : ClientService,
        private userService : UserService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.client = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.registerAccount.langKey = 'en';
            this.registerService.save(this.registerAccount).subscribe(() => {
                this.success = true;
                //retourne le user
                this.userService.find(this.registerAccount.login).subscribe(resp=>{
                    console.log('essai '+ resp.body.login);
                    this.client.user =resp.body;
                    console.info('login client :' +this.client.user.login);
                    // appeler la sauvegarde du client

                    console.info('appel create client');
                    this.clientService.create(this.client).subscribe(resp=>{
                        console.log(resp.body.id);

                    });
                });


            }, (response) => this.processError(response));
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
