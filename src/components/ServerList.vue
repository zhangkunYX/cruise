<template>
  <div class="server-item">
      <img :src="imageMap[serverItem.os]"/>
      <div class="server-infor">
          <ul>
              <li>
                  <i class="icon-desktop"></i>
                  {{serverItem.name}}
              </li>
              <li>
                  <span :class="serverItem.status">{{serverItem.status}}</span>
              </li>
              <li>
                  <i class="icon-info"></i>
                  <b>{{serverItem.ip}}</b>
              </li>
              <li>
                  <i class="icon-folder"></i>
                  <b>{{serverItem.location}}</b>
              </li>
          </ul>
      </div>
      <div class="server-resources">
          <div>
              <button class="icon-plus add-btn" @click="addResources(serverItem)"></button>
              <div class="server-list">
                  <div>
                      <span v-for="(item, index) in serverItem.resources" :key="index" :style="{marginTop: index > 4 ? 10 + 'px' : 0}">
                          {{item}}
                          <i class="icon-trash" @click="deleteItem(serverItem, item, index)"></i>
                      </span>
                  </div>
              </div>
          </div>
          <button class="deny-btn"><i class="icon-deny"></i>Deny</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
var windows = require('../../themes/os-icons/windows.png')
var ubuntu = require('../../themes/os-icons/ubuntu.png')
var suse = require('../../themes/os-icons/suse.png')
var debian = require('../../themes/os-icons/debin.png')
var centos = require('../../themes/os-icons/cent_os.png')
export default {
  name: 'ServerList',
  props: {
    server: Object
  },
  data () {
    return {
      serverItem: this.server,
      imageMap: {
        'windows': windows,
        'ubuntu': ubuntu,
        'suse': suse,
        'debian': debian,
        'centos': centos
      }
    }
  },
  methods: {
    addResources: function (server) {
      this.$emit('add-resources', server)
    },
    deleteItem: function (server, item, index) {
      var _this = this
      var resources = server.resources
      var id = server.id
      var _index = resources.indexOf(item)
      if (_index > -1) {
        resources.splice(_index, 1)
      }
      server.resources = resources
      axios({
        method: 'put',
        responseType: 'json',
        url: `/agents/${id}`,
        data: server
      })
        .then((response) => {
          _this.$emit('delete-complete', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    server: function (val) {
      this.serverItem = val
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.server-item{
    padding: 20px 24px 16px 24px;
    background-color: #fff;
}
.server-item>img{
  display: inline-block;
  width: 80px;
  height: 80px;
}
.server-item+.server-item{
    margin-top: 20px;
}
.server-infor{
    overflow: hidden;
    margin-left: 98px;
}
.server-infor ul>li{
    float: left;
    font-size: 14px;
    color: #00b4cf;
    font-weight: bold;
}
.server-infor ul>li+li{
    margin-left: 24px;
}
.server-infor li>i{
    float: left;
    margin-right: 14px;
    font-size: 16px;
    color: #999;
}
.server-infor li>b{
    color: #2d4054;
    font-weight: normal;
}
.server-infor li>span{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    color: #fff;
    font-weight: normal;
}
.idle{
    background-color: #ff9a2a;
}
.building{
    background-color: #7ebc39;
}
.server-resources{
    overflow: hidden;
    margin-top: 30px;
    margin-left: 98px;
}
.server-resources button{
    background: #00b4cf;
    color: #fff;
    height: 30px;
}
.server-resources .add-btn{
    float: left;
    width: 40px;
    font-size: 18px;
    cursor: pointer;
}
.server-resources .deny-btn{
    float: right;
    width: 90px;
    font-size: 14px;
    cursor: pointer;
}
.server-resources .deny-btn>i{
    display: inline-block;
    margin-right: 10px;
}
.server-list{
    float: left;
    width: 80%;
}
.server-list span{
    width: 80px;
    float: left;
    height: 30px;
    padding: 0 10px;
    margin-left: 10px;
    line-height: 30px;
    background-color: #efefef;
}
.server-list span>i{
    float: right;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 6px;
    cursor: pointer;
}
</style>
