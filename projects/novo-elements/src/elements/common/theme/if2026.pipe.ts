import { inject, Pipe, PipeTransform } from '@angular/core';
import { NovoTheme } from './theme-options';

@Pipe({
    name: 'ifBh2026Theme',
    standalone: false,
    pure: false,
})
export class If2026ThemePipe implements PipeTransform {
    theme = inject(NovoTheme);
    public transform(value: any, elseVal: any = undefined): any {
        return this.theme.isBh2026() ? value : elseVal;
    }
}
