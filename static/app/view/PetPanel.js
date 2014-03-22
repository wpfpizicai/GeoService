Ext.define('MyApp.view.PetPanel', {
    extend:'Ext.Panel',
    alias: 'widget.petListPanel',
    config:{
        layout:{
            type:'fit'
        },
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'我的小伙伴们'
            },
            {
                xtype:'list',
                store:'PetTracker',
                id:'PetList',
                itemId:'petList',
                emptyText: "<div>No Dogs Found</div>",
                loadingText: "Loading Pets",
                itemTpl:[
                    '<div>{name} is located at {geo} (longitude,latitude)</div>'
                ]
            }
        ],
        listeners:[
            {
                fn:'onPetsListItemTap',
                event:'itemtap',
                delegate:'#PetList'
            }
        ]
    },
    onPetsListItemTap:function (dataview, index, target, record, e, options) {
        this.fireEvent('petSelectCommand', this, record);
    }
});