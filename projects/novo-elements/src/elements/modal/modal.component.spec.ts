// // NG2
// import { TestBed, async } from '@angular/core/testing';
// // App
// import { NovoModalRef } from './modal-ref';
// import { NovoModalContainerComponent } from './modal-container.component';
// import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
// import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

// describe('Elements: NovoModalContainerComponent', () => {
//   let fixture;
//   let component;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [NovoModalContainerComponent],
//       providers: [
//         { provide: NovoModalRef, useClass: NovoModalRef },
//         { provide: ComponentUtils, useClass: ComponentUtils },
//       ],
//     }).compileComponents();
//     fixture = TestBed.createComponent(NovoModalContainerComponent);
//     component = fixture.debugElement.componentInstance;
//   }));

//   it('should initialize correctly', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe('Elements: NovoModalElement', () => {
//   let fixture;
//   let component;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [NovoModalElement],
//       providers: [{ provide: NovoModalRef, useClass: NovoModalRef }],
//     }).compileComponents();
//     fixture = TestBed.createComponent(NovoModalElement);
//     component = fixture.debugElement.componentInstance;
//   }));

//   it('should initialize correctly', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe('Elements: NovoModalNotificationElement', () => {
//   let fixture;
//   let component;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [NovoModalNotificationElement],
//       providers: [{ provide: NovoModalRef, useClass: NovoModalRef }],
//     }).compileComponents();
//     fixture = TestBed.createComponent(NovoModalNotificationElement);
//     component = fixture.debugElement.componentInstance;
//   }));

//   it('should initialize correctly', () => {
//     expect(component).toBeTruthy();
//   });
// });
