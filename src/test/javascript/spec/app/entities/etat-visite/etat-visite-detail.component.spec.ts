/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { EtatVisiteDetailComponent } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite-detail.component';
import { EtatVisiteService } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.service';
import { EtatVisite } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.model';

describe('Component Tests', () => {

    describe('EtatVisite Management Detail Component', () => {
        let comp: EtatVisiteDetailComponent;
        let fixture: ComponentFixture<EtatVisiteDetailComponent>;
        let service: EtatVisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [EtatVisiteDetailComponent],
                providers: [
                    EtatVisiteService
                ]
            })
            .overrideTemplate(EtatVisiteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatVisiteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatVisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EtatVisite(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.etatVisite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
