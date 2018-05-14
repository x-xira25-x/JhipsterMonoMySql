/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { TypeClientComponent } from '../../../../../../main/webapp/app/entities/type-client/type-client.component';
import { TypeClientService } from '../../../../../../main/webapp/app/entities/type-client/type-client.service';
import { TypeClient } from '../../../../../../main/webapp/app/entities/type-client/type-client.model';

describe('Component Tests', () => {

    describe('TypeClient Management Component', () => {
        let comp: TypeClientComponent;
        let fixture: ComponentFixture<TypeClientComponent>;
        let service: TypeClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [TypeClientComponent],
                providers: [
                    TypeClientService
                ]
            })
            .overrideTemplate(TypeClientComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TypeClient(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.typeClients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
