<template>
  <div class='menu'>
    <ul class="menu-list">
      <li :class="menu.active ? 'active' : ''"
        v-for="(menu, index) in menuList"
        :key="index">
        <i :class="menu.icon"></i>
        <b>{{menu.text}}</b>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'SideMenu',
  props: {

  },
  data () {
    return {
      menuList: [
        {icon: 'icon-dashboard', text: 'DASHBOARD'},
        {icon: 'icon-sitemap', text: 'AGENT', active: true},
        {icon: 'icon-boat', text: 'MYCRUISF'},
        {icon: 'icon-life-bouy', text: 'HELP'}
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.menu-list li{
  height: 45px;
  line-height: 45px;
  padding-left: 30px;
  color: #fff;
}
.menu-list li.active{
  color: #00b4cf;
  background-color: #435466;
}
.menu-list li:hover{
  color: #00b4cf;
  background-color: #435466;
}
.menu-list li i{
  display: inline-block;
  margin-right: 18px;
  font-size: 20px;
}
</style>
