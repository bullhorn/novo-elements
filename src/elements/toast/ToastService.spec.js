// APP
import { NovoToastService } from './ToastService';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Service: NovoToastService', () => {
    let service;

    beforeEach(() => {
        addProviders([
            NovoToastService,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoToastService], _service => {
        service = _service;
    }));

    it('should initialize with defaults', () => {
        expect(service).toBeDefined();
    });
});
