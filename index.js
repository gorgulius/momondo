var postData = {"AdultCount":1,"ChildAges":[],"TicketClass":"ECO","Segments":[{"Origin":"BUD","Destination":"ROM","Depart":"2017-04-23T22:00:00.000Z","Departure":"2017-04-23"},{"Origin":"ROM","Destination":"BUD","Depart":"2017-05-09T22:00:00.000Z","Departure":"2017-05-09"}],"Culture":"en-XX","Mix":"Segments","Market":"HU","DirectOnly":false,"IncludeNearby":false};

postData.Segments[0].Origin = "BUD";
postData.Segments[0].Destination = "SYD";
postData.Segments[1].Origin = "SYD";
postData.Segments[1].Destination = "BUD";

var settings = {  
  "url": "http://www.momondo.com/api/3.0/FlightSearch",
  "method": "POST",  
  "data": JSON.stringify(postData),
  "contentType": 'application/json; charset=utf-8',
  "dataType": 'json',
}

minSearch = function(offers) {
    var prices = [];
    for (i = 0; i < offers.length; i++) { 
    if (offers[i].TotalPriceEUR > 0) prices.push(offers[i].TotalPriceEUR);
}

var minPrice = Math.min.apply(Math, prices);
var result = $.grep(offers, function(e){ return e.TotalPriceEUR == minPrice; });
console.log("A legkisebb euroban számolva keresésé alapján : " + result[0]);
}

getData = function(searchId) {
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "http://www.momondo.com/api/3.0/FlightSearch/" + searchId + "/0/true",           
            success: function(data){
            console.log("Min Price : " + data.Summary.MinPrice);
            var minResult = $.grep(data.Offers, function(e){ return e.TotalPriceEUR == data.Summary.MinPrice; });
            console.log("A legkisebb a summary min price alapján : " + minResult[0])
            minSearch(data.Offers);
            }
        })
    }, 20000);
}

doThis = function () {
    $.ajax(settings).done(function (response) {
  console.log(response);
  getData(response.SearchId);
 //console.log(settings);
});
}


