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
        let spy = jest.spyOn(service, 'setToastOnSession');
        service.handleAlert({}, options);
        expect(spy).toHaveBeenLastCalledWith(expect.any(Object), options);
        spy.mockReset();
      });

      it('should call toastTimer if not isCloseable.', () => {
        const toast = {
          isCloseable: false,
        };
        let spy = jest.spyOn(service, 'toastTimer');
        service.handleAlert(toast, {});
        expect(spy).toHaveBeenCalledWith(toast);
        spy.mockReset();
      });

      it('should NOT call toastTimer if isCloseable.', () => {
        const toast = {
          isCloseable: true,
        };
        const options = {
          isCloseable: true,
        };
        let spy = jest.spyOn(service, 'toastTimer');
        service.handleAlert(toast, options);
        expect(spy).not.toHaveBeenCalled();
        spy.mockReset();
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
