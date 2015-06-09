'use strict';

angular.module('favoriteFactory', [])

.factory('Favorites', ['$location', '$http', 'SearchResults', function($location, $http, SearchResults) {
  var favorites = [];

  var getFavorites = function() {
    var url = '/api/users/favorites';
    $http.get(url)
    .success(function(data, status, headers, config) {
      favorites.splice(0, favorites.length);
      data.forEach(function(val){
        favorites.push(val);
      });
      console.log(favorites);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };
    
  var isFavorite = function (room) {
    if (FavoritesFactory.favorites.contains(room)) {
      return true;
    } else {
      return false;
    }
  };

  var addFavorite = function (room) {
    var url = '/api/users/favorites/addfavorites';
    console.log(room);
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.getFavorites();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var removeFavorite = function (room) {
    var url = '/api/users/favorites/deletefavorites';
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.favorites.splice(room,1);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var FavoritesFactory = {
    removeFavorite: removeFavorite,
    addFavorite: addFavorite,
    isFavorite: isFavorite,
    getFavorites: getFavorites
  };

  return FavoritesFactory;

}]);