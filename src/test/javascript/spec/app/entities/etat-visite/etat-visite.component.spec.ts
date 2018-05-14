/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { EtatVisiteComponent } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.component';
import { EtatVisiteService } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.service';
import { EtatVisite } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.model';

describe('Component Tests', () => {

    describe('EtatVisite Management Component', () => {
        let comp: EtatVisiteComponent;
        let fixture: ComponentFixture<EtatVisiteComponent>;
        let service: EtatVisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [EtatVisiteComponent],
                providers: [
                    EtatVisiteService
                ]
            })
            .overrideTemplate(EtatVisiteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatVisiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatVisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EtatVisite(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etatVisites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
