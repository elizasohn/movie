

function Marquee() {
  this.movies = [];
  this.movieCount = 0;
}

Marquee.prototype.addMovie = function(movie) {
  this.movieCount += 1;
  movie.id = this.movieCount;
  this.movies.push(movie);
}

Marquee.prototype.findMovie = function(id) {
  for (var i = 0; i < this.movies.length; i++) {
    if (this.movies[i]) {
      if (this.movies[i].id === id) {
        return this.movies[i];
      }
    }
  }
  return false;
}

Marquee.prototype.getShowings = function(user) {
  var theseShowings = [];
  this.movies.forEach(function(movie) {
    if (user.age >= movie.minimumAge) {
      var movieTimes = [movie.title, movie.id, []];
      movie.showings.forEach(function(showing) {
          if (user.timeRange === "evening") {
            if (showing > 16) movieTimes[2].push(showing);
          } else if (user.timeRange === "matinee") {
            if (showing <= 16) movieTimes[2].push(showing);
          } else {
            movieTimes[2].push(showing);
          }
      });
      theseShowings.push(movieTimes);
    }
  });
  return theseShowings;
}

function Movie(title, minimumAge, firstRelease, showings) {
  this.title = title;
  this.minimumAge = minimumAge;
  this.firstRelease = firstRelease;
  this.showings = showings;
}

function User(age, timeRange) {
  this.age = age;
  this.timeRange = timeRange;
}

var userChoice = {
  time: 10,
  id:2
}

function getTicket(id, time, age) {
  var thisMovie = bizMarquee.findMovie(id);
  var firstRun = thisMovie.firstRelease;
  var isSenior = age >= 65;
  var isMatinee = time <= 16;
  var ticketPrice = 5;
  if (firstRun) ticketPrice += 2;
  if (isSenior) ticketPrice -= 2;
  if (isMatinee) ticketPrice -= 1;
  return ticketPrice;
}

var movie1 = new Movie("Abominable", 0, true, [10, 12, 16]);
var movie2 = new Movie("Hustlers", 17, false, [16, 19, 22]);
var movie3 = new Movie("Brittany Runs a Marathon", 15, true, [12, 16, 19]);
var movie4 = new Movie("Lion King", 0, false, [10, 12, 16, 18]);

var bizMarquee = new Marquee();

bizMarquee.addMovie(movie1);
bizMarquee.addMovie(movie2);
bizMarquee.addMovie(movie3);
bizMarquee.addMovie(movie4);

var user;

var timeTranslator = {
  10: "10:00 AM",
  11: "11:00 AM",
  12: "12:00 PM",
  13: "1:00 PM",
  14: "2:00 PM",
  15: "3:00 PM",
  16: "4:00 PM",
  17: "5:00 PM",
  18: "6:00 PM",
  19: "7:00 PM",
  20: "8:00 PM",
  21: "9:00 PM",
  22: "10:00 PM",
}



$(document).ready(function() {

  $("#enterUser").click(function(){
    var age = $("#ageInput").val();
    var timeRange = $("#showingSelection").val();
    user = new User(age, timeRange);
    var showingOptions = bizMarquee.getShowings(user);
    var listingHtml = makeListings(showingOptions);
    $('.userInputForm').hide();
    $(".showtime").append(listingHtml);
  })

  $(".showtime").on("click", "li", function(){
    var id = this.value;
    var time = this.getAttribute("time");
    var age = user.age;
    var thisPrice = (getTicket(id, time, age));
    alert(`Your ticket price is $${thisPrice}.00`)
  })


});


function makeListings(showingOptions) {
  var result = '';
  showingOptions.forEach(function(movie) {
    var movieName = movie[0];
    var movieId = movie[1];
    var times = movie[2];
    var timeListItems = times.map(function(t) {
      return `<li value="${movieId}" time="${t}">${timeTranslator[t]}</li>`
    });
    result += `
      <div class="card">
        <h4>${movieName}</h4>
        <ul>
          ${timeListItems.join('')}
        </ul>
      </div>

    `

  })


  return result;
}
