/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { VisiteComponent } from '../../../../../../main/webapp/app/entities/visite/visite.component';
import { VisiteService } from '../../../../../../main/webapp/app/entities/visite/visite.service';
import { Visite } from '../../../../../../main/webapp/app/entities/visite/visite.model';

describe('Component Tests', () => {

    describe('Visite Management Component', () => {
        let comp: VisiteComponent;
        let fixture: ComponentFixture<VisiteComponent>;
        let service: VisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [VisiteComponent],
                providers: [
                    VisiteService
                ]
            })
            .overrideTemplate(VisiteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Visite(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.visites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
