/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { BienDetailComponent } from '../../../../../../main/webapp/app/entities/bien/bien-detail.component';
import { BienService } from '../../../../../../main/webapp/app/entities/bien/bien.service';
import { Bien } from '../../../../../../main/webapp/app/entities/bien/bien.model';

describe('Component Tests', () => {

    describe('Bien Management Detail Component', () => {
        let comp: BienDetailComponent;
        let fixture: ComponentFixture<BienDetailComponent>;
        let service: BienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [BienDetailComponent],
                providers: [
                    BienService
                ]
            })
            .overrideTemplate(BienDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BienDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Bien(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bien).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
