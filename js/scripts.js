function Marquee(){
  this.movies = [];
  this.movieCount = 0;
}

Marquee.prototype.addMovie = function(movie){
  this.movieCount += 1;
  movie.id = this.movieCount;
  this.movies.push(movie);
}

Marquee.prototype.findMovie = function(id){
  for (var i = 0; i < this.movies.length; i++){
    if (this.movies[i]) {
      if (this.movies[i].id === id){
        return this.movies[i];
      }
    }
  }
  return false;
}














$(document).ready(function() {


});


// Abominable
// Hustlers
// Brittany Runs a Marathon
// Lion King
