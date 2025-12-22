export const URLS = {
    BASE: 'https://bullhorn.github.io/novo-elements/docs/#/components/',
    HOME: 'https://bullhorn.github.io/novo-elements/docs/#/home',
};

export function examplesUrl(component: string): string {
    return `${URLS.BASE}${component}/examples`;
}

export function componentsUrl(component: string): string {
    return `${URLS.BASE}${component}`;
}
