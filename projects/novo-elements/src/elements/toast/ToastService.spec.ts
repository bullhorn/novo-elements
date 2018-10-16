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

    describe('function handleAlert(toast, options): ', () => {
      it('should be defined.', () => {
        expect(service.handleAlert).toBeDefined();
      });

      it('should call setToastOnSession.', () => {
        let options = {
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
        let toast = {
          isCloseable: false,
        };
        spyOn(service, 'toastTimer');

        service.handleAlert(toast, {});

        expect(service.toastTimer).toHaveBeenCalledWith(toast);
      });

      it('should NOT call toastTimer if isCloseable.', () => {
        let toast = {
          isCloseable: true,
        };
        let options = {
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
        let toast = {
          show: false,
        };

        let result = service.isVisible(toast);

        expect(result).toBeFalsy();
      });

      it('should return true is toast.show = true.', () => {
        let toast = {
          show: true,
        };

        let result = service.isVisible(toast);

        expect(result).toBeTruthy();
      });
    });
  });
});
