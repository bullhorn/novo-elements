export const MockMeta = {
    entity: 'ENTITY_NAME',
    entityMetaUrl: '',
    label: 'ENTIY_LABEL',
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            sortOrder: 10
        },
        {
            name: 'jersey-number',
            type: 'float',
            label: 'Jersey Number',
            description: 'There was a field below me!',
            sortOrder: 50
        },
        {
            name: 'jersey-color',
            type: 'select',
            label: 'Jersey Color',
            options: ['Red', 'Blue', 'Green'],
            sortOrder: 51
        },
        {
            name: 'cat',
            type: 'text',
            label: 'Favorite Cat',
            sortOrder: 550
        }
    ]
};
export const MockMetaHeaders = {
    sectionHeaders: [{
        'label': 'Cat Related',
        'name': 'sectionHeader1',
        'sortOrder': 500,
        'enabled': true
    }, {
        'label': 'Important',
        'name': 'sectionHeader2',
        'sortOrder': 45,
        'enabled': true
    }],
};
Object.assign(MockMetaHeaders, MockMeta);
