function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map-canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}

var markers = [
    {
      title: "Ramsis on the World",
      lat: 38.235616,
      lng:  -85.715553,
      description: "grub",
      marker: ''
    },
    {
      title: "Molly Malone's",
      lat: 38.241760,
      lng: -85.725012,
      description: "pub",
      marker: ''
    },
    {
      title: "Oshea's",
      lat: 38.240664,
      lng: -85.724904,
      description: "pub",
      marker: ''
    },
    {
      title: "Wick's Pizza",
      lat: 38.240361,
      lng: -85.724346,
      description: "grub",
      marker: ''
    },
    {
      title: "Nowhere Bar",
      lat: 38.237917,
      lng:  -85.719583,
      description: "pub",
      marker: ''
    },
    {
      title: "Boombozz Pizza",
      lat: 38.231883,
      lng: -85.710034,
      description: "grub",
      marker: ''
    },
    {
      title:  "Mark's Feed Store BBQ",
      lat: 38.231445,
      lng: -85.708532,
      description: "grub",
      marker: ''
    },
    {
      title:  "Seviche",
      lat: 38.231175,
      lng: -85.707545,
      description: "grub",
      marker: ''
    },
    {
      title:  "Cumberland Brewery",
      lat:  38.230729,
      lng:  -85.705389,
      description: "pub",
      marker: ''
    },
    {
      title:  "Cafe Mimosa",
      lat:  38.231487,
      lng:  -85.706344,
      description: "grub",
      marker: ''
    },
    {
      title:  "Palermo",
      lat:  38.234069,
      lng:  -85.712695,
      description: "grub",
      marker: ''
    },
    {
      title:  "Bristol Bar",
      lat:  38.235241,
      lng:  -85.714041,
      description: "pub",
      marker: ''
    },
    {
      title:  "Heine Brothers Coffee",
      lat:  38.237297,
      lng:  -85.719467,
      description: "grub",
      marker: ''
    }
];
var markerArray = [];
var viewModel = function() {
  var map, bounds;

  var self = this;
<<<<<<< HEAD

  //this is not an object so don't use labels
  //query: ko.observable('');
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
  query: ko.observable('');
>>>>>>> parent of 33cc484... fix issue with ViewModel instantiation
=======

  self.query = ko.observable;
>>>>>>> parent of bcd56dd... remove duplicate line
  self.query = ko.observable('');
  self.filterQuery = ko.observable('');
    //credit to : http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
    self.search = function(value) {
    // remove all the current beers, which removes them from the view
    viewModel.markerArray.removeAll();

    for(var x in markerArray) {
      if(markerArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.markerArray.push(markerArray[x]);
      }
    }
<<<<<<< HEAD
  };
>>>>>>> origin/master
=======
  }
>>>>>>> parent of 33cc484... fix issue with ViewModel instantiation

    //Initialize map location, set as IIFE to kick off immediately
  var initMap = function() {
    //create map
    var mapOptions = {
        center: new google.maps.LatLng(38.235616,-85.715553),
        zoom: 16,
        mapTypeId: 'terrain',
        panControl: false,
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    bounds = new google.maps.LatLngBounds();

    //create the markerArray for markers to populate on creation
    self.markerArray = ko.observableArray();
    //add markers
    for(var i = 0; i < markers.length; i++) {
      var markPos = new google.maps.LatLng(
        markers[i].lat,
        markers[i].lng
      );
//this finally works, leave it alone!
      var marker = new google.maps.Marker({
        position: markPos,
        map: map,
        icon: 'images/marker.png',
        title: markers[i].title,
        animation: google.maps.Animation.DROP
      });

      bounds.extend(markPos);
   //   map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());

      self.markerArray.push(marker);

      self.filterSubmit = ko.dependentObservable(function () {
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(name, function (marker) {
          return marker.toLowerCase().indexOf(search) >=0;
        });
      });
//still need to work on infoWindow, put more content in
//creates the window for each marker, just applies a generic youtube video at the moment, need to get it working with Ajax to supply video.

        var ytRequestTimeout = setTimeout(function(){
        console.log("failed to get Youtube resources");
    }, 10000);
        google.maps.event.addListener(marker, "click", function(){
          var yt_url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + this.title + '+louisville&maxResults=1&callback=?&key=AIzaSyActmR_LWyXc0Y9CxHucYh-C73C09Om318';
          //make some room for youtube ajax call and supporting code here.
          $.getJSON(yt_url, function(response){
            console.log(response);
            var title = response.items[0].id.videoId;
            //var playerUrl = 'src="https://www.youtube.com/embed/' + title + '"';
            //$player.append(playerUrl);
            var contentString = '<div id="player">' + '<iframe width="320" height="200" src="https://www.youtube.com/embed/'+title+'" frameborder="0" allowfullscreen></iframe>' + '</div>';
            var ytWindow = new google.maps.InfoWindow({
              content: contentString
              })
            ytWindow.open(marker.get('map'), marker);

          });//closure for .getJSON
    });//closure for google.maps.event.addListener
  }

  }();


};

ko.applyBindings(new viewModel());
viewModel.query.subscribe(viewModel.search);
