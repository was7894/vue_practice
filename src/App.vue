<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">데쓰노트</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link active" :to="{ name: 'Todos' }">맹고의 일정목록</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {};
</script>

<style></style>
