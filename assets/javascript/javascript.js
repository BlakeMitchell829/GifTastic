$(document).ready(function () {

  var nature = [
    "Clouds", "Forest", "Ocean","River", "Lake",
    "Forest", "Stars", "Desert", "Moon", "Clouds",
    "Sunrise", "Moutains",
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".nature-button", function () {
    $("#nature").empty();
    $(".nature-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=4krmpDXVr6EJ0plsfn5dTVv1VUvtcsZX&limit=15"


    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var natureDiv = $("<div class=\"nature-item\">");
//add rating to images
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);
//function to animate images 
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var natureImage = $("<img>");
          natureImage.attr("src", still);
          natureImage.attr("data-still", still);
          natureImage.attr("data-animate", animated);
          natureImage.attr("data-state", "still");
          natureImage.addClass("nature-image");

          natureDiv.append(p);
          natureDiv.append(natureImage);

          $("#nature").append(natureDiv);
        }
      });
  });

  $(document).on("click", ".nature-image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-nature").on("click", function (event) {
    event.preventDefault();
    var newNature = $("input").eq(0).val();

    if (newNature.length > 0) {
      nature.push(newNature);
    }

    populateButtons(nature, "nature-button", "#nature-buttons");
  });
  populateButtons(nature, "nature-button", "#nature-buttons");
});