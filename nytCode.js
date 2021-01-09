// Global variables
// var search = $(".searchTerm").val();
// var num = $("#num").find("option:selected").text();
// var yearStart = $(".yearStart").val();
// var yearEnd = $(".yearEnd").val();
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
  // Gets term searched for
   var searchTerm = $(".searchTerm").val();
   var yearStart = $(".yearStart").val();
   var yearEnd = $(".yearEnd").val();

   var filter="";
  console.log(yearStart);
  console.log(yearEnd);
   if (yearStart.length>0 && yearEnd.length>0) {
     filter="&fq=pub_year:(\""+yearStart+"\" \""+yearEnd+"\")";
   } else if (yearStart.length>0) {
     filter="&fq=pub_year:(\""+yearStart+"\")";
   };
   console.log(searchTerm);
  //var searchTerm2 = "cake";
  // Returns API URL with term searched
  return "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + filter + "&api-key=0GWKvvC2MKV3ZR6QAeTJ6kJAdnB98AG7";
}
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */
function updatePage(NYTData) {
  console.log(NYTData);
  clear();
  var num = $("#num").find("option:selected").text();
  console.log(num);
  // Storing array of search results
  var results = NYTData.response.docs;
  // For loop going through array of search results
  for (i=0;i<num;i++){
    // Creates elements to show results
    var div=$("<div>");
    var aTag=$("<a>");
    var pTag=$("<p>");
    // Retrieves and adds headline and article URL to div
    // div.text(results[i].headline.main);
    aTag.attr("href",results[i].web_url);
    aTag.text(results[i].headline.main);
    div.addClass("article");
    div.append(aTag);
    // Retrieves and adds byline to div
    pTag.text(results[i].byline.original);
    div.append(pTag);
    $(".listarticles").append(div);
  };
}
// Function to empty out the articles
function clear() {
  $(".listarticles").empty();
}
// Assigns id to run-search, creates search button and appends to container
$(".container").append($("<button>").attr("id","run-search").text("cake"));
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  console.log("click");
  event.preventDefault();
  // Empty the region associated with the articles
  clear();
  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  console.log(queryURL);
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});
// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);