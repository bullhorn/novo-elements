const f = [
  {
    "name": "id", "type": "ID", "dataType": "Integer", "optional": false
  },
  {
    "name": "description", "type": "SCALAR", "dataType": "String", "maxLength": 2147483647, "confidential": false, "optional": true, "label": "Description", "required": false, "readOnly": false, "multiValue": false, "hideFromSearch": false, "sortOrder": 190, "hint": "", "description": "", "systemRequired": true
  },
  {
    "name": "subtotal", "type": "SCALAR", "dataType": "BigDecimal", "dataSpecialization": "MONEY", "confidential": false, "optional": true, "label": "Pre-tax Amount", "required": false, "readOnly": false, "multiValue": false, "hideFromSearch": false, "sortOrder": 40, "hint": "", "description": "", "systemRequired": false
  },
  {
    "name": "clientCorporation", "type": "TO_ONE", "confidential": false, "optional": true, "label": "Client Corporation", "required": false, "readOnly": false, "multiValue": false, "inputType": "SELECT", "optionsType": "ClientCorporation", "optionsUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/options/ClientCorporation", "hideFromSearch": false, "sortOrder": 110, "hint": "", "description": "", "systemRequired": false, "associatedEntity": { "entity": "ClientCorporation", "entityMetaUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/ClientCorporation?fields=*", "label": "Company", "dateLastModified": "1556903784277", "fields": [{ "name": "id", "type": "ID", "dataType": "Integer", "optional": false }] }, "interactions": [{ "event": "change", "invokeOnInit": false }]
  },
  {
    "name": "billingProfile", "type": "TO_ONE", "confidential": false, "optional": true, "label": "Billing Profile", "required": false, "readOnly": false, "multiValue": false, "inputType": "SELECT", "optionsType": "BillingProfile", "optionsUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/options/BillingProfile", "hideFromSearch": false, "sortOrder": 120, "hint": "", "description": "", "systemRequired": true, "associatedEntity": { "entity": "BillingProfile", "entityMetaUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/BillingProfile?fields=*", "label": "Billing Profile", "dateLastModified": "1556903787983", "fields": [{ "name": "id", "type": "ID", "dataType": "Integer", "optional": false }] }, "interactions": [{ "event": "focus" }, { "event": "change", "invokeOnInit": true }, { "event": "change", "invokeOnInit": false }]
  },
  {
    "name": "periodEndDate", "type": "SCALAR", "dataType": "Date", "dataSpecialization": "DATE", "confidential": false, "optional": false, "label": "Period End Date", "required": false, "readOnly": false, "multiValue": false, "hideFromSearch": false, "sortOrder": 80, "hint": "", "description": "", "systemRequired": true
  },
  {
    "name": "placement", "type": "TO_ONE", "confidential": false, "optional": true, "label": "Placement", "required": false, "readOnly": false, "multiValue": false, "inputType": "SELECT", "optionsType": "Placement", "optionsUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/options/Placement", "hideFromSearch": false, "sortOrder": 90, "hint": "", "description": "", "systemRequired": false, "associatedEntity": { "entity": "Placement", "entityMetaUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/Placement?fields=*", "label": "Placement", "dateLastModified": "1556903787139", "fields": [{ "name": "id", "type": "ID", "dataType": "Integer", "optional": false }] }, "interactions": [{ "event": "focus" }, { "event": "change", "invokeOnInit": true }]
  },
  {
    "name": "fileAttachments", "type": "TO_MANY", "confidential": false, "optional": true, "label": "File Attachments", "required": false, "readOnly": true, "multiValue": false, "optionsType": "BillableChargeFileAttachment", "optionsUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/options/BillableChargeFileAttachment", "hideFromSearch": false, "systemRequired": false, "associatedEntity": { "entity": "BillableChargeFileAttachment", "entityMetaUrl": "http://mitch-backend.bh-bos2.bullhorn.com:8181/rest-services/1yg8p/meta/BillableChargeFileAttachment?fields=*", "label": "Billable Charge File Attachment", "dateLastModified": "1556903811338", "fields": [{ "name": "name", "type": "SCALAR", "dataType": "String", "maxLength": 255, "confidential": false, "optional": false, "label": "Name", "required": false, "readOnly": false, "multiValue": false, "hideFromSearch": false, "systemRequired": false }] }
  }
]
