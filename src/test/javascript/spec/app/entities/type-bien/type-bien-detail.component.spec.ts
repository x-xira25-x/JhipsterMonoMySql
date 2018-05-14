/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { TypeBienDetailComponent } from '../../../../../../main/webapp/app/entities/type-bien/type-bien-detail.component';
import { TypeBienService } from '../../../../../../main/webapp/app/entities/type-bien/type-bien.service';
import { TypeBien } from '../../../../../../main/webapp/app/entities/type-bien/type-bien.model';

describe('Component Tests', () => {

    describe('TypeBien Management Detail Component', () => {
        let comp: TypeBienDetailComponent;
        let fixture: ComponentFixture<TypeBienDetailComponent>;
        let service: TypeBienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [TypeBienDetailComponent],
                providers: [
                    TypeBienService
                ]
            })
            .overrideTemplate(TypeBienDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeBienDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeBienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TypeBien(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.typeBien).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
