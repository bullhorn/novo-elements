// import { TooltipDirective } from './Tooltip';

// describe('Element: Tooltip', () => {
//     let tooltip;

//     beforeEach(() => {
//         tooltip = new TooltipDirective();
//     });

//     it('should set the position when none is set', () => {
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('top');
//     });

//     it('should not set the position when one is set', () => {
//         tooltip.position = 'bottom';
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('bottom');
//     });

//     it('should check positions correctly', () => {
//         tooltip.position = 'top';
//         expect(tooltip.isPosition('top')).toBe(true);
//         tooltip.position = null;
//         expect(tooltip.isPosition('not-top')).toBe(false);
//     });

//     it('should set the position to bottom-left', () => {
//         tooltip.position = 'bottom-left';
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('bottom-left');
//     });

//     it('should set the position to bottom-right', () => {
//         tooltip.position = 'bottom-right';
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('bottom-right');
//     });

//     it('should set the position to top-left', () => {
//         tooltip.position = 'top-left';
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('top-left');
//     });

//     it('should set the position to top-right', () => {
//         tooltip.position = 'top-right';
//         tooltip.ngOnInit();
//         expect(tooltip.position).toEqual('top-right');
//     });

//     it('should check types correctly', () => {
//         tooltip.type = 'success';
//         expect(tooltip.isType('success')).toBe(true);
//         tooltip.type = null;
//         expect(tooltip.isType('not-success')).toBe(false);
//     });
// });
