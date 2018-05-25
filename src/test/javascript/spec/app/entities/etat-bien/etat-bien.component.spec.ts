/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { EtatBienComponent } from '../../../../../../main/webapp/app/entities/etat-bien/etat-bien.component';
import { EtatBienService } from '../../../../../../main/webapp/app/entities/etat-bien/etat-bien.service';
import { EtatBien } from '../../../../../../main/webapp/app/entities/etat-bien/etat-bien.model';

describe('Component Tests', () => {

    describe('EtatBien Management Component', () => {
        let comp: EtatBienComponent;
        let fixture: ComponentFixture<EtatBienComponent>;
        let service: EtatBienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [EtatBienComponent],
                providers: [
                    EtatBienService
                ]
            })
            .overrideTemplate(EtatBienComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatBienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatBienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EtatBien(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etatBiens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
