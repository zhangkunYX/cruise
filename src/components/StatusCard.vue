<template>
  <div :class="classObject">
    <div>{{status}}</div>
    <b :class="icon"></b>
    <span>{{number}}</span>
  </div>
</template>

<script>

export default {
  name: 'StatusCard',
  props: {
    status: String,
    number: Number
  },
  data () {
    return {

    }
  },
  computed: {
    classObject: function () {
      return {
        'card': true,
        'bg-building': this.status === 'Building',
        'bg-idle': this.status === 'Idle'
      }
    },
    icon: function () {
      return {
        'icon-cog': this.status === 'Building',
        'icon-coffee': this.status === 'Idle'
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.card{
  text-align: center;
  padding: 16px;
  height: 84px;
  color: #fff;
}
.card>div{
  text-align: left;
  font: 18px bold;
}
.card>b{
  display: inline-block;
  position: relative;
  font-size: 144px;
  opacity: 0.2;
  top: -58px;
}
.card>span{
  font-size: 48px;
  float: right;
}
.card>b[class="icon-cog"]{
  animation: rotating 2s linear infinite;
}
@keyframes rotating{
  from{
    -webkit-transform: rotate(0deg);
    transform:rotate(0);
  }
  to{
    transform:rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
.bg-building{
  background-color: #ff9a2a;
}
.bg-idle{
  background-color: #7fbc39;
}
</style>
