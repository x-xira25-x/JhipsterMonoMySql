import { Component, OnInit } from '@angular/core';

import {Principal, AccountService, User} from '../../shared';
import {Client, ClientService} from '../../entities/client';
import {UserService} from '../../shared/user/user.service';
import {AgentImmobilier, AgentImmobilierService} from '../../entities/agent-immobilier';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    client: Client;
    user: User[];
    agentImmobilier: AgentImmobilier;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private userService: UserService,
        private clientService: ClientService,
        private agentImmoService: AgentImmobilierService,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            console.log(this.copyAccount(account));
            this.clientService.findIdClient(this.copyAccount(account).login).subscribe(resp => {
                        this.client = resp.body;
                      account.valueOf().firstName = resp.body.nom;
                account.valueOf().lastName = resp.body.prenom;
                this.settingsAccount = this.copyAccount(account);

            });
            this.userService.find(this.copyAccount(account).login).subscribe(resp => {
                console.log(resp.body);
                  this.agentImmoService.findIdAgentImmobilier(resp.body.id).subscribe(resp => {
                this.agentImmobilier = resp.body;
                account.valueOf().firstName = resp.body.nom;
                account.valueOf().lastName = resp.body.prenom;
                account.valueOf().email = resp.body.email;
                this.settingsAccount = this.copyAccount(account);
            });
            });
        });
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
                if (this.client !== undefined){
                    console.log(this.client);
                    this.client.nom = account.valueOf().firstName;
                    this.client.prenom = account.valueOf().lastName;
                    this.client.email = account.valueOf().email;
                    console.log(this.client.prenom);
                    console.log('lastaname ' + account.valueOf().lastName);
                    this.clientService.update(this.client).subscribe(resp => {} );
                } else {
                    this.agentImmobilier.nom = account.valueOf().firstName;
                    this.agentImmobilier.prenom = account.valueOf().lastName;
                    this.agentImmobilier.email = account.valueOf().email;
                    console.log('agent' + this.agentImmobilier);
                    this.agentImmoService.update(this.agentImmobilier).subscribe(res => {} );
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {

        return {

            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
