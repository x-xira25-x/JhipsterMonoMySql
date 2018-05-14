import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { JhipsterTestMonoClientModule } from './client/client.module';
import { JhipsterTestMonoAgentImmobilierModule } from './agent-immobilier/agent-immobilier.module';
import { JhipsterTestMonoBienModule } from './bien/bien.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [

        JhipsterTestMonoClientModule,
        JhipsterTestMonoAgentImmobilierModule,
        JhipsterTestMonoBienModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTestMonoEntityModule {}
