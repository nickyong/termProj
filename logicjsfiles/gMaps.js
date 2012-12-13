

var gMaps=function(){
}

gMaps.prototype.initAddLoc=function(){
  
  $('#subLocId').show();
    $('#searchTextField').show();
  this.finalLoc=0;
  this.initialize();
  this.addMarkersonClick();

}



gMaps.prototype.updateLoc=function(){
  var loc=this.finalLoc;
  if(loc===0){
    window.toasty('Please do key in a location');
  }
  else{
    // if there is a valid text input inside the text box we replace the location 
    console.log('updatingLoc');
    var lat=this.finalLoc.lat();
    var lng=this.finalLoc.lng();
    eventInfo1.gMapsloc=this.finalLoc;

    $('#gMapsPosId').html('Coords:'+lat+','+lng);
    $.mobile.changePage( "#addEventTab", { transition: "slideup"} );
  }
}

gMaps.prototype.dispEventsMap=function(Eventdata){
    // the input will be like details,picture, latlng
    // for each object i iterate through i add a marker on the map
    // here i hide the confirm and enter loc ids
    $('#subLocId').hide();
    $('#searchTextField').hide();
    console.log('yes displaying');
    console.log(Eventdata);
    this.initialize();
    this.addMarker();

    $.each(Eventdata, function(key, value) {
     
      //var glatLng= jQuery.parseJSON(value['latLng']);
      
      console.log(value);
      gMaps1.objtoInfobox(value);
      
    });



}


gMaps.prototype.addWindowonCampus=function(){
    var campusName=window.masterInfo1.campusName;
    if(campusName==='carnegie mellon university'){

      window.masterInfo1.latLng=new google.maps.LatLng(40.443504 , -79.94157100000001);
    }
    else if(campusName==='berkeley college'){
      window.masterInfo1.latLng=new google.maps.LatLng(37.871715,-122.260356);
    }
    else if(campusName==='michigan university'){
      window.masterInfo1.latLng=new google.maps.LatLng(42.318451,-83.22990700000003);
    }
    else if(campusName==='chicago university'){
      window.masterInfo1.latLng=new google.maps.LatLng(41.789132,-87.600122);
    }



    var iconClass='map_campus';

    var value='campus';
    window.gMaps1.addMarker(window.masterInfo1.latLng,campusName,iconClass,value);
    
}



gMaps.prototype.objtoInfobox=function(value){

      var lat=value['lat'];
      var lng=value['lng'];
      var eventType=value['eventType'];
      var date= value['date'];
      var descrip=value['descrip'];
      var time= value['time'];
      var title=value['title'];

      var iconClass='map_'+eventType;
      console.log(typeof(lat));
      console.log(value['title']);


      //console.log(glatLng);
      if(lat!=undefined&& lng!=undefined){
        var latLng=new google.maps.LatLng(lat,lng);
      //console.log(typeof(glatLng));
      //console.log(glatLng[0]);
      window.gMaps1.addMarker(latLng,title,iconClass,value);


      }

}
gMaps.prototype.addMarker=function(latLng,title,iconClass,value){
      /*
      var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              
          });
      google.maps.event.addListener(marker, 'click', function() {
      console.log('hihi');
      });
      */
        
 

        var boxText = document.createElement("div");
        boxText.className=iconClass;
        boxText.href='#dispDetailsTab';
     
        var myOptions = {
                 content: boxText
                ,boxStyle: {
                  textAlign: "center"
                  ,fontSize: "8pt"
                  ,width: "50px"
            
                 }
                 ,zIndex: 1
                ,disableAutoPan: true
                ,pixelOffset: new google.maps.Size(0, 0)
                ,position: latLng
                ,closeBoxURL: ""
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: true
        };


        
        var ibLabel = new InfoBox(myOptions);
        //ibLabel.setContent(newElem);

        if(value!='campus'){
           $(boxText).click(function(){
          //console.log(value['title']);
          //console.log(value['_id']);
          //console.log('sssssssssssssssssssss');
          $.mobile.loading( 'show', { theme: "b", text: "Page Loading...",textVisible: true });
          window.eventDetails1.getSpecificEventDetails(value['_id']);
          
            });
          

        }
       ibLabel.open(map);
      
}



function testthis(){
  console.log("clicked");
}


gMaps.prototype.addMarkersonClick=function(){

          
          google.maps.event.addListener(map, 'click', function(event) {
          

          if(window.marker!=undefined){
              window.marker.setMap(null);
          }

          console.log(event.latLng.lat());
          console.log('addMarkersonClick');

          //alert(event.latLng.lat());
          window.gMaps1.updateInputLoc(event.latLng);

          console.log(typeof(event.latLng));
          window.gMaps1.finalLoc=event.latLng;
          placeMarker(event.latLng);
          
          // after i place the marker i cannot place another

        });

        function placeMarker(location) {

          window.marker = new google.maps.Marker({
              position: location,
              map: map
          });
          //map.setCenter(location);
          
        }
    
}

gMaps.prototype.updateInputLoc=function(latlng1){

    //alert('got here');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng1}, function(results, status) {
        //alert(results[1].formatted_address);
        $('#searchTextField').val(results[1].formatted_address);
        $('#gMapsPosId').val(results[1].formatted_address);
        });
}
gMaps.prototype.initialize=function(){
        console.log('initialize');
        var mapOptions = {
          center: window.masterInfo1.latLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    
     
        map = new google.maps.Map(document.getElementById('map_canvas'),
          mapOptions);
        
        //google.maps.event.trigger(map, 'resize');

        console.log('triggered resize');
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });

        
        setTimeout(function() {
     
            google.maps.event.trigger(map,'resize');
            //$('#map_canvas').css('display','block');
            map.setCenter(window.masterInfo1.latLng)
          }, 1000);


        
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          input.className = '';
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // Inform the user that the place was not found and return.
            input.className = 'notfound';
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          var image = new google.maps.MarkerImage(
              place.icon,
              new google.maps.Size(71, 71),
              new google.maps.Point(0, 0),
              new google.maps.Point(17, 34),
              new google.maps.Size(35, 35));
          marker.setIcon(image);
          marker.setPosition(place.geometry.location);
          gMaps1.finalLoc=place.geometry.location;

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        console.log('made it here2');
        window.gMaps1.addWindowonCampus();

      }
      //google.maps.event.addDomListener(window, 'load', initialize);


      //google.maps.event.addDomListener(window, 'load', window.gMaps1.init);




/*
$(document ).ready(function() {
  window.gMaps1=new gMaps();
  window.gMaps1.init();
  });

*/





