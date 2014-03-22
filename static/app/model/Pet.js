Ext.define('MyApp.model.Pet', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'name'
            },
            {
                name: 'geo'
            },
            {
                name: 'date',
                type: 'date'
            },
            {
                name: '_id'
            }
        ]
    }
});