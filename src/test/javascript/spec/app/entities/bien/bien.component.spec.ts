/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { BienComponent } from '../../../../../../main/webapp/app/entities/bien/bien.component';
import { BienService } from '../../../../../../main/webapp/app/entities/bien/bien.service';
import { Bien } from '../../../../../../main/webapp/app/entities/bien/bien.model';

describe('Component Tests', () => {

    describe('Bien Management Component', () => {
        let comp: BienComponent;
        let fixture: ComponentFixture<BienComponent>;
        let service: BienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [BienComponent],
                providers: [
                    BienService
                ]
            })
            .overrideTemplate(BienComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bien(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.biens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
