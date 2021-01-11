// App
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoToastService } from './ToastService';

describe('Elements: NovoToastService', () => {
  describe('Service: ', () => {
    const resolver: any = null;
    const utils = new ComponentUtils(resolver);
    const service = new NovoToastService(utils);

    it('should be defined.', () => {
      expect(service).toBeDefined();
    });

    describe('function handleAlert(toast, options): ', () => {
      it('should be defined.', () => {
        expect(service.handleAlert).toBeDefined();
      });

      it('should call setToastOnSession.', () => {
        const options = {
          isCloseable: false,
          hideDelay: 3000,
          message: 'test message',
          header: 'test header',
        };
        spyOn(service, 'setToastOnSession');

        service.handleAlert({}, options);

        expect(service.setToastOnSession).toHaveBeenCalledWith({}, options);
      });

      it('should call toastTimer if not isCloseable.', () => {
        const toast = {
          isCloseable: false,
        };
        spyOn(service, 'toastTimer');

        service.handleAlert(toast, {});

        expect(service.toastTimer).toHaveBeenCalledWith(toast);
      });

      it('should NOT call toastTimer if isCloseable.', () => {
        const toast = {
          isCloseable: true,
        };
        const options = {
          isCloseable: true,
        };
        spyOn(service, 'toastTimer');

        service.handleAlert(toast, options);

        expect(service.toastTimer).not.toHaveBeenCalled();
      });
    });

    describe('function isVisible(toast): ', () => {
      it('should be defined.', () => {
        expect(service.isVisible).toBeDefined();
      });

      it('should return false is toast.show = false.', () => {
        const toast = {
          show: false,
        };

        const result = service.isVisible(toast);

        expect(result).toBeFalsy();
      });

      it('should return true is toast.show = true.', () => {
        const toast = {
          show: true,
        };

        const result = service.isVisible(toast);

        expect(result).toBeTruthy();
      });
    });
  });
});
