<template lang="html">
  <div class="nav-side-menu">
    <div class="brand">IPL Dashboard</div>
    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
    <div class="menu-list">
        <ul id="menu-content" class="menu-content collapse out">
          <li>
            <router-link to="/stats">
              <i class="fa fa-dashboard fa-lg"></i> Statistics
            </router-link>
          </li>
          <li>
            <router-link to="/trivia">
              <i class="fa fa-home fa-lg"></i> Trivia
            </router-link>
          </li>
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
</style>
