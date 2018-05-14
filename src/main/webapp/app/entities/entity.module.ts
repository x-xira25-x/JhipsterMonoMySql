import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { JhipsterTestMonoClientModule } from './client/client.module';
import { JhipsterTestMonoAgentImmobilierModule } from './agent-immobilier/agent-immobilier.module';
import { JhipsterTestMonoBienModule } from './bien/bien.module';
import { JhipsterTestMonoVisiteModule } from './visite/visite.module';
import { JhipsterTestMonoEtatVisiteModule } from './etat-visite/etat-visite.module';
import { JhipsterTestMonoTypeBienModule } from './type-bien/type-bien.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [

        JhipsterTestMonoClientModule,
        JhipsterTestMonoAgentImmobilierModule,
        JhipsterTestMonoBienModule,
        JhipsterTestMonoVisiteModule,
        JhipsterTestMonoEtatVisiteModule,
        JhipsterTestMonoTypeBienModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTestMonoEntityModule {}
