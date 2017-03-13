// App
import { NovoToastService } from './ToastService';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

describe('Elements: NovoToastService', () => {
    describe('Service: ', () => {
        let resolver: any = null;
        let utils = new ComponentUtils(resolver);
        let service = new NovoToastService(utils);

        it('should be defined.', () => {
            expect(service).toBeDefined();
        });

    });
});
