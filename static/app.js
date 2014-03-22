Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Pet'
    ],
    stores: [
        'PetTracker'
    ],
    views: [
        'PetPanel',
        'MapPanel',
        'RadiusPicker'
    ],
    name: 'MyApp',
    controllers: [
        'PetTracker'
    ],
    launch: function() {
        var petList = {
            xtype: 'petListPanel'
        };
        var petMap = {
            xtype: 'petMap'
        };
        var radiusPicker = {
            xtype: 'radiusPicker'
        };
        Ext.Viewport.add([petList, petMap, radiusPicker]);
    }
});
