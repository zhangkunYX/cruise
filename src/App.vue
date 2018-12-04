<template>
  <div id="app">
    <div class="header">
      <div class="center header-logo">
        <div class="header-user">
          <i class="icon-angle-up up"></i>
          <i class="icon-angle-down down"></i>
          <span class="user"></span>
          <ul class="op-list">
            <li>
              <i class="icon-id-card"></i>
              <b>Profile</b>
            </li>
            <li>
              <i class="icon-sign-in"></i>
              <b>Sign&nbsp;Out</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sidebar">
        <side-menu>
          <history-list></history-list>
        </side-menu>
      </div>
      <div class="content">
        <div class="card-area">
          <status-card status="Building" :number="buildNum"></status-card>
          <status-card status="Idle" :number="ildeNum"></status-card>
          <div class="equip-record">
            <div>
              <span>ALL</span>
              <b>{{serverList.length}}</b>
            </div>
            <div>
              <span>PHYSICAL</span>
              <b>{{physicalNum}}</b>
            </div>
            <div>
              <span>VITUAL</span>
              <b>{{vitualNum}}</b>
            </div>
          </div>
        </div>
        <div class="type-search">
          <div class="tab-area">
            <span class="active">All</span>
            <span>Physical</span>
            <span>Vitual</span>
          </div>
          <div class="search-input">
            <i class="icon-search"></i>
            <input type="text">
          </div>
          <div class="switch">
            <i class="icon-th-card"></i>
            <i class="icon-th-list active"></i>
          </div>
        </div>
        <div class="server-area">
          <server-list v-for="(item, index) in serverList" :key="index" :server="item" @add-resources="addResources(item, index)"></server-list>
          <cr-dialog ref="dialog" :server="server"></cr-dialog>
        </div>
      </div>
    </div>
    <div class="footer">
      ©&nbsp;Copyright&nbsp;2017&nbsp;ThoughtWorks
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../themes/main.css'
import '../themes/font-icons/fonts/cruise.svg'
import '../themes/font-icons/fonts.css'
import SideMenu from './components/SideMenu'
import HistoryList from './components/HistoryList'
import ServerList from './components/ServerList'
import StatusCard from './components/StatusCard'
import CrDialog from './components/CrDialog'

export default {
  name: 'App',
  components: {
    SideMenu,
    HistoryList,
    ServerList,
    StatusCard,
    CrDialog
  },
  data () {
    return {
      visible: false,
      serverList: [],
      server: [],
      buildNum: null,
      ildeNum: null,
      physicalNum: null,
      vitualNum: null
    }
  },
  methods: {
    fetchServer () {
      axios
        .get(`agents`)
        .then(response => {
          this.serverList = response.data
          this.buildNum = this.getNumber('status', 'building')
          this.ildeNum = this.getNumber('status', 'idle')
          this.physicalNum = this.getNumber('type', 'physical')
          this.vitualNum = this.getNumber('type', 'virtual')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addResources: function (server, index) {
      this.$refs.dialog.ifVisible = true
      this.server = server
      this.$refs.dialog.adjustPosition(server, index)
    },
    getNumber: function (type, value) {
      var filterList = this.serverList.filter(function (item, index) {
        return item[type] === value
      })
      return filterList.length
    }
  },
  mounted: function () {
    this.fetchServer()
  }
}
</script>

<style>
.container{
  display: grid;
  justify-content: center;
  grid-column-gap: 30px;
  grid-template-columns: 270px 900px;
  grid-template-areas: "sidebar content";
  background-color: #f3f3f3;
}
.header{
  height: 44px;
  padding: 13px 0;
}
.header-user{
  position: relative;
  float: right;
}
.header-user:hover .op-list{
  display: block;
}
.header-user>i.down{
  display: none;
}
.header-user:hover>i.down{
  display: block;
}
.header-user:hover>i.up{
  display: none;
}
.header-user>i{
  float: right;
  padding: 5px 0;
  margin-left: 12px;
  font-size: 30px;
  color: #999;
}
.header-user>ul{
  position: absolute;
  right: 0;
  top: 40px;
}
.op-list{
  display: none;
  width: 140px;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0,0,0,0.3);
}
.op-list li{
  height: 16px;
  line-height: 16px;
  padding: 8px 0;
}
.op-list li>i{
  float: left;
  margin-left: 20px;
}
.op-list li:hover{
  background-color: #efefef;
}
.sidebar{
  position: relative;
  grid-area: sidebar;
  padding: 14px 0;
  background-color: #2d4054;
  min-height: 1000px;
}
.content{
  margin-top: 20px;
  padding-bottom: 20px;
  grid-area: content;
  display: inline-grid;
  grid-template-rows: 116px 68px auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
  "cardarea cardarea cardarea"
  "typesearch typesearch typesearch"
  "serverarea serverarea serverarea";
}
.card-area{
  grid-area: cardarea;
  display: inline-grid;
  grid-column-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
}
.equip-record{
  display: inline-grid;
  grid-template-columns: 1.5fr 2fr 2fr;
  background-color: #fff;
  text-align: center;
}
.equip-record span{
  display: block;
  font-size: 12px;
  margin-top: 20px;
}
.equip-record b{
  display: block;
  font-size: 20px;
  margin-top: 40px;
}
.type-search{
  grid-area: typesearch;
  background-color: #fff;
  margin-top: 18px;
}
.type-search>div{
  float: left;
  overflow: hidden;
}
.tab-area>span{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 90px;
  text-align: center;
  border-right: 1px solid #f3f3f3;
  font-weight: 200;
}
.tab-area>span.active{
  height: 47px;
  color: #00b4cf;
  border-bottom: 3px solid #00b4cf;
}
.search-input{
  position: relative;
  padding: 10px 0;
  margin-left: 30px;
}
.search-input>input{
  background-color: #f3f3f3;
  width: 172px;
  height: 30px;
  float: left;
  text-indent: 34px;
}
.search-input>i{
  position: absolute;
  left: 10px;
  top: 14px;
  font-size: 20px;
  color: #999;
}
.type-search>div.switch{
  padding: 16px 0;
  float: right;
  padding-right: 4px;
}
.switch>i{
  font-size: 20px;
  margin-right: 20px
}
.switch>i.active{
  color: #00b4cf;
}
.server-area{
  grid-area: serverarea;
  position: relative;
  padding-top: 18px;
}
.footer{
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  font-size: 12px;
}
.center{
  width: 1200px;
  margin: 0 auto;
}
.header-logo{
  height: 40px;
  position: relative;
  background: url(./assets/logo.svg) no-repeat center center;
  background-size: 100px 34px;
}
.user{
  float: right;
  width: 40px;
  height: 40px;
  background: url(../themes/os-icons/ubuntu.png);
  background-size: 40px 40px;
}
</style>
