
Ext.define('MyApp.store.PetTracker', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.Pet'
    ],

    config: {
        autoLoad: true,
        model: 'MyApp.model.Pet',
        storeId: 'PetTracker',
        proxy: {
            type: 'ajax',
            url: '/findall',
            reader: {
                type: 'json',
                idProperty: '_id',
                rootProperty: 'data',
                useSimpleAccessors: true
            }
        }
    }
});