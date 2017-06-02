<template lang="html">
  <div class="nav-side-menu">
    <div class="brand">IPL Dashboard</div>
    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
    <div class="menu-list">
        <ul id="menu-content" class="menu-content collapse out">
          <router-link to="/stats" tag="li" active-class="active">
            <i class="fa fa-dashboard fa-lg"></i> Statistics
          </router-link>
          <router-link to="/trivia" tag="li" active-class="active">
            <i class="fa fa-home fa-lg"></i> Trivia
          </router-link>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.nav-side-menu {
  z-index: 999;
}
#menu-content i {
  margin-left: 3px;
}
#menu-content li {
  cursor: pointer;
}
</style>
