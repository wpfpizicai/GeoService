Ext.define('MyApp.controller.PetTracker', {
    extend: 'Ext.app.Controller',
    markers: [],
    directionsDisplay: null,
    directionsService: null,
    config: {
        stores: ['PetTracker'],
        refs: {
            petListPanel: 'petListPanel',
            petList: '#PetList',
            petMap: 'petMap',
            radiusPicker: 'radiusPicker'
        },
        control: {
            petListPanel: {
                petSelectCommand: "onPetSelected"
            },
            petMap: {
                backButton: "onBackButton",
                mapRender: "onMapRender",
                nearButton: "onNear"
            },
            radiusPicker: {
                pickerChanged: "onPickerRadiusChange"
            }
        }
    },
    launch: function() {
        // Initialize Google Map Services
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();

        var mapRendererOptions = {
            //draggable: true,  //Allows to drag route
            //hideRouteList: true,
            suppressMarkers: true
        };

        this.directionsDisplay.setOptions(mapRendererOptions);
    },

    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    onPetSelected: function (list, record) {
        var mapView = this.getPetMap();
        mapView.setRecord(record);
        Ext.Viewport.animateActiveItem(mapView, this.slideLeftTransition);

        this.renderMap(mapView, mapView.down("#petMap").getMap(), record.data);
    },

    onBackButton: function () {
        console.log("Back to home");
        var store = Ext.getStore('PetTracker');
        store.getProxy().setUrl('http://localhost:3001/findall');
        store.load();
        Ext.Viewport.animateActiveItem(this.getPetListPanel(), this.slideRightTransition);
    },

    onNear: function() {
        this.getRadiusPicker().show();
    },

    onPickerRadiusChange: function(picker, pickerValue) {
        var store = Ext.getStore('PetTracker');
        var gmap = this.getPetMap().down("#petMap");
        var geo = gmap.getGeo();
        var g_marks = this.markers;
        var proxy = store.getProxy();

        proxy.setUrl('http://localhost:3001/findnear/');
        proxy.setExtraParams({
            'lon': geo.getLongitude(),
            'lat': geo.getLatitude(),
            'radi' : pickerValue["radius"]
        });
        store.load({
              callback: function (records, options, success) {
                if (records.length > 0) {
                      Ext.each(records, function (record) {
                            var geo = record.data.geo;
                            var p = new google.maps.LatLng(geo[1], geo[0]);
                            var m = new google.maps.Marker({
                                position: p,
                                title: record.data.name + "'s Location",
                                animation: google.maps.Animation.DROP,
                                map: gmap.getMap(),
                                icon: 'resources/img/brown_markerD.png'
                          });
                          g_marks.push(m);
                      });
                  }
              }
        });

    },

    renderMap: function (extmap, map, record) {
        // erase old markers
        if (this.markers.length > 0) {
            Ext.each(this.markers, function (marker) {
                marker.setMap(null);
            });
        }

        var position = new google.maps.LatLng(record.geo[1] ,record.geo[0]);

        var dynaMarker = new google.maps.Marker({
            position: position,
            title: record.name + "'s Location" + record.geo[1] + "," + record.geo[0] ,
            map: map,
            icon: 'resources/img/yellow_MarkerB.png'
        });

        this.markers.push(dynaMarker);

        var infowindow = new google.maps.InfoWindow({
            content: "We've found your dog sniffing flowers!"
        });

        google.maps.event.addListener(dynaMarker, 'click', function () {
            infowindow.open(map, dynaMarker);
        });

        setTimeout(function () {
            map.panTo(position);
        }, 1000);

        var geo = extmap.down("#petMap").getGeo();
        var currentPosition = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
        this.plotRoute(map, currentPosition, position);

        // stop updates to center
        geo.suspendUpdates();
    },

    plotRoute: function (map, orig, dest) {
        this.directionsDisplay.setMap(map);

        var dd = this.directionsDisplay;

        var selectedMode = "WALKING"; // DRIVING, WALKING, BICYCLING
        var request = {
            origin: orig,
            destination: dest,
            travelMode: google.maps.TravelMode[selectedMode]
        };
        this.directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                dd.setDirections(response);
            }
        });

    }
});