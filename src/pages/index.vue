<template>
  <h1>영화목록</h1>
  <div class="row">
    <div v-for="(list, index) in movieLists.list" class="card col-6" style="width: 18rem" :key="index">
      <img :src="list.Poster" alt="" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ list.Title }}</h5>
        <p class="card-text">{{ list.Plot }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>

  <h2>영화정보</h2>
  <div class="card" style="width: 18rem">
    <img :src="movies.list.Poster" alt="" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ movies.list.Title }}</h5>
      <p class="card-text">{{ movies.list.Plot }}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive } from "vue";

export default {
  setup() {
    const URL = `http://www.omdbapi.com/?apikey=8b3df5ee&s=bce`;
    const API_URL = `http://www.omdbapi.com/?i=tt3896198 & apikey=8b3df5ee`;
    const movies = reactive({ list: [] });
    const movieLists = reactive({ list: [] });

    const getMovies = () => {
      axios.get(API_URL).then(({ data }) => {
        movies.list = data;
        console.log("movies.list:", movies.list);
      });
    };

    const getMoviesList = () => {
      axios.get(URL).then(({ data }) => {
        movieLists.list = data.Search;
        console.log("getmovieslist", movieLists.list);
      });
    };

    getMovies();
    getMoviesList();

    return {
      movies,
      movieLists,
    };
  },
};
</script>
