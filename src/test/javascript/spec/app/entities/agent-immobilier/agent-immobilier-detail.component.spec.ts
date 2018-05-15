/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { AgentImmobilierDetailComponent } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier-detail.component';
import { AgentImmobilierService } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier.service';
import { AgentImmobilier } from '../../../../../../main/webapp/app/entities/agent-immobilier/agent-immobilier.model';

describe('Component Tests', () => {

    describe('AgentImmobilier Management Detail Component', () => {
        let comp: AgentImmobilierDetailComponent;
        let fixture: ComponentFixture<AgentImmobilierDetailComponent>;
        let service: AgentImmobilierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [AgentImmobilierDetailComponent],
                providers: [
                    AgentImmobilierService
                ]
            })
            .overrideTemplate(AgentImmobilierDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgentImmobilierDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentImmobilierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AgentImmobilier(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.agentImmobilier).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
