export function getURLs() {
    const baseUrl = (global as any).E2E_BASE_URL || 'https://bullhorn.github.io/novo-elements/docs';
    return {
        BASE: `${baseUrl}/#/components/`,
        HOME: `${baseUrl}/#/home`,
    };
}

export const URLS = getURLs();

export const COMPONENT_URLS = {
    AVATAR: 'avatar',
    BREADCRUMB: 'breadcrumbs',
    BUTTON: 'button',
    DATA_TABLE: 'data-table',
    DROPDOWN: 'dropdown',
    NON_IDEAL_STATE: 'non ideal state',
    QUERY_BUILDER: 'query builder',
};

export function examplesUrl(component: string): string {
    const urls = getURLs();
    return `${urls.BASE}${component}/examples`;
}

export function componentsUrl(component: string): string {
    const urls = getURLs();
    return `${urls.BASE}${component}`;
}
