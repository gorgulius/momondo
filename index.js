minSearch = function(offers) {
    var prices = [];
    for (i = 0; i < offers.length; i++) { 
    if (offers[i].TotalPriceEUR > 0) prices.push(offers[i].TotalPriceEUR);
}

var minPrice = Math.min.apply(Math, prices);
var result = $.grep(offers, function(e){ return e.TotalPriceEUR == minPrice; });
//console.log("A legkisebb euroban számolva keresésé alapján : " + result[0]);
displayResult(result[0]);

}

displayResult = function(result) {
    $('#myTable').append('<tr><td><a href="' + result.Deeplink + '">click me to get the ticket</td><td>Price : ' + result.TotalPrice +' HUF</td></tr>');    
}

getData = function(searchId) {
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "http://www.momondo.com/api/3.0/FlightSearch/" + searchId + "/0/true",           
            success: function(data){
            console.log("Min Price : " + data.Summary.MinPrice);
            var minResult = $.grep(data.Offers, function(e){ return e.TotalPriceEUR == data.Summary.MinPrice; });
            //console.log("A legkisebb a summary min price alapján : " + minResult[0].TotalPriceEUR);
            displayResult(minResult[0]);
            minSearch(data.Offers);
            }
        })
    }, 20000);
}

doThis = function () {
    //2017-05-09 document.getElementsByName('fromDate')[0].value
    var postData = {"AdultCount":1,"ChildAges":[],"TicketClass":"ECO","Segments":[{"Origin":"","Destination":"","Depart":"","Departure":""},{"Origin":"","Destination":"","Depart":"","Departure":""}],"Culture":"en-XX","Mix":"Segments","Market":"HU","DirectOnly":false,"IncludeNearby":false};

    postData.Segments[0].Origin = document.getElementsByName('from')[0].value || "BUD";
    postData.Segments[0].Destination = document.getElementsByName('to')[0].value || "SYD";
    postData.Segments[1].Origin = document.getElementsByName('to')[0].value || "SYD";
    postData.Segments[1].Destination = document.getElementsByName('from')[0].value || "BUD";
    postData.Segments[0].Departure = document.getElementsByName('fromDate')[0].value || "2017-04-24";
    postData.Segments[1].Departure = document.getElementsByName('toDate')[0].value || "2017-05-11";

    var settings = {  
        "url": "http://www.momondo.com/api/3.0/FlightSearch",
        "method": "POST",  
        "data": JSON.stringify(postData),
        "contentType": 'application/json; charset=utf-8',
        "dataType": 'json',
    }

    $.ajax(settings).done(function (response) {
    console.log(response);
    getData(response.SearchId);
    //console.log(settings);
    });
}


