/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestMonoTestModule } from '../../../test.module';
import { EtatBienDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/etat-bien/etat-bien-delete-dialog.component';
import { EtatBienService } from '../../../../../../main/webapp/app/entities/etat-bien/etat-bien.service';

describe('Component Tests', () => {

    describe('EtatBien Management Delete Component', () => {
        let comp: EtatBienDeleteDialogComponent;
        let fixture: ComponentFixture<EtatBienDeleteDialogComponent>;
        let service: EtatBienService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestMonoTestModule],
                declarations: [EtatBienDeleteDialogComponent],
                providers: [
                    EtatBienService
                ]
            })
            .overrideTemplate(EtatBienDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatBienDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatBienService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
