/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { AgentImmobilierComponent } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier.component';
import { AgentImmobilierService } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier.service';
import { AgentImmobilier } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier.model';

describe('Component Tests', () => {

    describe('AgentImmobilier Management Component', () => {
        let comp: AgentImmobilierComponent;
        let fixture: ComponentFixture<AgentImmobilierComponent>;
        let service: AgentImmobilierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [AgentImmobilierComponent],
                providers: [
                    AgentImmobilierService
                ]
            })
            .overrideTemplate(AgentImmobilierComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgentImmobilierComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentImmobilierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AgentImmobilier(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.agentImmobiliers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
