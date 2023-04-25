<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- 네임드라우터 -->
      <router-link :to="{ name: 'Home' }" class="navbar-brand">데쓰노트</router-link>
      <!-- 패스라우터 -->
      <!-- <router-link to="/" class="navbar-brand">데쓰노트</router-link> -->
      <div class="navbar-nav">
        <router-link class="nav-link active" :to="{ name: 'Todos' }">맹고의 일정목록</router-link>
        <!-- <router-link class="nav-link active" to="/Todos">맹고의 일정목록</router-link> -->
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
