/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { TypeClientDetailComponent } from '../../../../../../main/webapp/app/entities/type-client/type-client-detail.component';
import { TypeClientService } from '../../../../../../main/webapp/app/entities/type-client/type-client.service';
import { TypeClient } from '../../../../../../main/webapp/app/entities/type-client/type-client.model';

describe('Component Tests', () => {

    describe('TypeClient Management Detail Component', () => {
        let comp: TypeClientDetailComponent;
        let fixture: ComponentFixture<TypeClientDetailComponent>;
        let service: TypeClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [TypeClientDetailComponent],
                providers: [
                    TypeClientService
                ]
            })
            .overrideTemplate(TypeClientDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeClientDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TypeClient(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.typeClient).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
