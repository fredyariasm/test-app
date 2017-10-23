(function(){   
    
    
    
    // Public token for testing    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZHlhcmlhc20iLCJhIjoiY2o4dXpjMnIwMTd3aDMzbWI1YWdydjB5ZyJ9.9ydX2NA4GsMSBFtB1PQIVQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/bright-v9',
        center : [-73.60,45.55],
        zoom: 10
    });
            
    //Adding support to create/modify/delete a point, linen and polygon.
    var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {                
            point:true,
            line_string:true,
            polygon: true,
            trash: true
        }
    });
    
    map.addControl(draw);
            
            
    map.on('load', function () {

        // Adding sources from url http://donnees.ville.montreal.qc.ca/dataset?res_format=GeoJSON  provided for the test    
        map.addSource('montreal-grandsparcs', {
            type: 'geojson',
            data: 'http://donnees.ville.montreal.qc.ca/dataset/549f42e1-5826-4727-8662-ef68b9b364f0/resource/f00c2ff4-fbac-4988-90cc-307798d8a626/download/grandsparcs.geojson'
            });        
            
        map.addSource('montreal-postestaxi', {
            type: 'geojson',
            data: 'http://donnees.ville.montreal.qc.ca/dataset/80a84478-e246-478c-8c73-4c4082617303/resource/3aa4304c-10a7-443f-8bc4-1697c7e26848/download/postestaxi.geojson'
            });             
            
        map.addSource('montreal-localisationpluviometres', {
            type: 'geojson',
            data: 'http://donnees.ville.montreal.qc.ca/dataset/922d3656-2687-4f8c-8a70-0d3e9ec717c2/resource/33d7034d-4071-4ae5-8a58-39f5115fc60a/download/localisationpluviometres.geojson'
            });     
        
        map.addSource('montreal-courseau', {
            type: 'geojson',
            data: 'http://donnees.ville.montreal.qc.ca/dataset/c128aff5-325c-4599-ab66-1c9d0b3abc94/resource/0f64976e-19c1-4d29-bcc5-4b663a392617/download/courseau.geojson'
            });     
            
        map.addSource('montreal-districtelectoral', {
            type: 'geojson',
            data: 'http://donnees.ville.montreal.qc.ca/dataset/a938bdc4-fd12-4eeb-8b44-c483e798dcdc/resource/17e05ba3-226b-4447-972e-1f1b34382a3b/download/districtelectoral.json'
            });     
            
        
            
               
       // Adding 5 layers to the test 
        map.addLayer({
            "id":"postestaxi",
            "type": "circle",
            "source":"montreal-postestaxi",
            "paint": {
                "circle-radius": 3,
                "circle-color": "#FAF330",
                "circle-stroke-width":1
            }
            
        });
            
      map.addLayer({
            "id":"localisationpluviometres",
            "type": "circle",
            "source":"montreal-localisationpluviometres",
            "paint": {
                "circle-radius": 3,
                "circle-color": "#3535FE",
                "circle-stroke-width":2
            }            
        });
            
       
        map.addLayer({
                'id': 'grandsparcs',
                'type': 'fill',
                'source': "montreal-grandsparcs",
            'paint':{
                'fill-color':'#3FD248',
                'fill-opacity':0.8
            }
        });
            
            
        map.addLayer({
            "id":"courseau",
            "type": "line",
            "source":"montreal-courseau",
            "paint": {                
                "line-color": "#35FEFE"                
            }
            
        });
            
            
        map.addLayer({
            'id': 'districtelectoral',
            'type': 'fill',
            'source': "montreal-districtelectoral",
            'paint':{
                'fill-color': '#E74C3C',
                'fill-opacity':0.3,
                'fill-outline-color':'#17202A'                    
            }
        });
            
    });
    
    
    
    var toggleableLayerIds = ['postestaxi','localisationpluviometres', 'grandsparcs','courseau', 'districtelectoral' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
    }
    
    
})();