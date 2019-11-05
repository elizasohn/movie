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
          if (user.timeRange === "eve") {
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


var movie1 = new Movie("Abominable", 0, true, [10, 12, 16]);
var movie2 = new Movie("Hustlers", 17, false, [16, 19, 22]);
var movie3 = new Movie("Brittany Runs a Marathon", 15, true, [12, 16, 19]);
var movie4 = new Movie("Lion King", 0, false, [10, 12, 16, 18]);

var bizMarquee = new Marquee();

bizMarquee.addMovie(movie1);
bizMarquee.addMovie(movie2);
bizMarquee.addMovie(movie3);
bizMarquee.addMovie(movie4);

var user1 = new User(16, "all");

console.log(bizMarquee);
console.log(bizMarquee.getShowings(user1));
/*







*/



$(document).ready(function() {


});


// "Abominable", true, 0
// "Hustlers", false, 17
// "Brittany Runs a Marathon", true, 15
// "Lion King", false, 0
