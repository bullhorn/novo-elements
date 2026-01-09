export const URLS = {
    BASE: 'https://bullhorn.github.io/novo-elements/docs/#/components/',
    HOME: 'https://bullhorn.github.io/novo-elements/docs/#/home',
};

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
    return `${URLS.BASE}${component}/examples`;
}

export function componentsUrl(component: string): string {
    return `${URLS.BASE}${component}`;
}
