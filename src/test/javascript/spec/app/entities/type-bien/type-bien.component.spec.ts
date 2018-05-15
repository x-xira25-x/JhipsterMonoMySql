/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { TypeBienComponent } from '../../../../../../main/webapp/app/entities/type-bien/type-bien.component';
import { TypeBienService } from '../../../../../../main/webapp/app/entities/type-bien/type-bien.service';
import { TypeBien } from '../../../../../../main/webapp/app/entities/type-bien/type-bien.model';

describe('Component Tests', () => {

    describe('TypeBien Management Component', () => {
        let comp: TypeBienComponent;
        let fixture: ComponentFixture<TypeBienComponent>;
        let service: TypeBienService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [TypeBienComponent],
                providers: [
                    TypeBienService
                ]
            })
            .overrideTemplate(TypeBienComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeBienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeBienService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TypeBien(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.typeBiens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
