export default {
    entity: 'Opportunity',
    entityMetaUrl: 'http://develop-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/Opportunity?fields=*',
    label: 'Opportunity',
    fields: [
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name'
        },
        {
            name: 'number',
            type: 'number',
            label: 'Number',
            required: true
        },
        {
            name: 'float',
            type: 'float',
            label: 'Float',
            required: true
        },
        {
            name: 'currency',
            type: 'money',
            label: 'Cost',
            currencyFormat: 'USD'
        },
        {
            name: 'percent',
            type: 'percentage',
            label: 'Percentage',
            required: true
        },
        {
            name: 'date',
            type: 'date',
            label: 'Date',
            required: true
        },
        {
            name: 'time',
            type: 'time',
            label: 'Time',
            required: true
        },
        {
            name: 'status',
            type: 'select',
            dataType: 'String',
            maxLength: 200,
            confidential: false,
            label: 'Status',
            options: [
                {
                    value: 'Open',
                    label: 'Open'
                },
                {
                    value: 'Qualifying',
                    label: 'Qualifying'
                },
                {
                    value: 'Negotiating',
                    label: 'Negotiating'
                },
                {
                    value: 'TRIGGER',
                    label: 'TRIGGER'
                }
            ]
        },
        {
            name: 'nextAction',
            type: 'tiles',
            dataType: 'String',
            label: 'Next Action',
            required: true,
            options: [
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'task',
                    label: 'Task'
                },
                {
                    value: 'appointment',
                    label: 'Appointment'
                }
            ]
        },
        {
            name: 'state',
            type: 'picker',
            dataType: 'String',
            maxLength: 200,
            confidential: false,
            label: 'State',
            required: true,
            // TODO: Align picker with META by passing META obj into picker
            // options: [ /* flat array of states */ ]
            options: {
                options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                    'West Virginia', 'Wisconsin', 'Wyoming']
            }
        }, {
            name: 'startDate',
            type: 'datetime',
            dataType: 'Timestamp',
            label: 'Start Date',
            required: true
        }, {
            name: 'quota',
            type: 'number',
            dataType: 'Integer',
            label: 'Quota',
            required: true
        }, {
            name: 'secret',
            type: 'hidden',
            dataType: 'String',
            label: 'Top Secret',
            required: true,
            defaultValue: 'The secret code is: 08322'
        }, {
            name: 'categories',
            type: 'picker',
            confidential: false,
            optional: false,
            label: 'Categories',
            required: true,
            readOnly: false,
            multiValue: true,
            inputType: 'SELECT',
            options: [
                {
                    value: 'Open',
                    label: 'Open'
                },
                {
                    value: 'Qualifying',
                    label: 'Qualifying'
                },
                {
                    value: 'Negotiating',
                    label: 'Negotiating'
                },
                {
                    value: 'TRIGGER',
                    label: 'TRIGGER'
                }
            ]
        }, {
            name: 'owner',
            type: 'entity',
            confidential: false,
            optional: false,
            label: 'Owner',
            required: false,
            readOnly: true,
            multiValue: false,
            inputType: 'SELECT',
            optionsType: 'CorporateUser',
            optionsUrl: '/options/CorporateUser',
            hideFromSearch: false,
            associatedEntity: {
                entity: 'CorporateUser',
                label: 'Corporate User'
            }
        }, {
            name: 'address',
            type: 'address',
            dataType: 'Address',
            dataSpecialization: 'SYSTEM',
            confidential: false,
            optional: true,
            label: 'Address',
            required: false,
            readOnly: false,
            multiValue: false,
            hideFromSearch: true,
            fields: [
                {
                    name: 'address1',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'Addressxxx',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'address2',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'Address 2',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'city',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'City',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'state',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 30,
                    confidential: false,
                    optional: true,
                    label: 'State',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    inputType: 'SELECT',
                    optionsType: 'StateText',
                    optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/StateText',
                    hideFromSearch: false
                },
                {
                    name: 'zip',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 15,
                    confidential: false,
                    optional: true,
                    label: 'Zip',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'countryID',
                    type: 'SCALAR',
                    dataType: 'Integer',
                    confidential: false,
                    optional: false,
                    label: 'Country',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    inputType: 'SELECT',
                    optionsType: 'Country',
                    optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/Country',
                    defaultValue: 2260,
                    hideFromSearch: false
                },
                {
                    name: 'countryCode',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 0,
                    optional: true
                },
                {
                    name: 'countryName',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 0,
                    optional: true
                }
            ]
        },
        {
            name: 'checkbox',
            type: 'checkbox',
            label: 'Checkbox'
        },
        {
            name: 'checklist',
            type: 'checklist',
            label: 'CheckList',
            options: ['Morning', 'Day', 'Night', 'Overnight'],
            required: true
        },
        {
            name: 'address',
            type: 'address',
            label: 'Address',
            required: true
        },
        {
            name: 'attachments',
            type: 'file',
            label: 'Attachments',
            multiValue: true,
            required: true
        }
    ]
};
