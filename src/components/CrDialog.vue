<template>
  <div class='cr-dialog' v-if="ifVisible" :style="position">
    <slot>
      <b class="triangle"></b>
      <i class="icon-close" @click="close"></i>
      <h2>Seperate multiple resource name with commas</h2>
      <input type="text"
        v-model="value"
        placeholder="input value"
        @input="handleInput"
        @focus="handleFocus"
        @blue="handleBlur">
      <div class="button-group">
          <button class="add" @click="add">Add Resource</button>
          <button class="cancle" @click="close">Cancle</button>
      </div>
    </slot>
  </div>
</template>

<script>
import axios from 'axios'
import {isParent} from '../../utils/utils.js'
export default {
  name: 'CrDialog',
  props: {
    server: Object
  },
  data () {
    var _this = this
    return {
      value: '',
      ifVisible: this.visible,
      serverItem: {},
      position: {
        top: '0'
      },
      clickFn: function (event) {
        var target = document.getElementsByClassName('cr-dialog')[0]
        if (!isParent(event.target, target) && event.target.className !== 'icon-plus add-btn') {
          _this.ifVisible = false
          document.body.removeEventListener(event.type, _this.clickFn, false)
        }
      }
    }
  },
  watch: {
    ifVisible: function (status) {
      var _this = this
      this.ifVisible = status
      if (this.ifVisible) {
        this.$nextTick(function () {
          // this.adjustPosition(_this.serverItem)
          document.body.addEventListener('click', _this.clickFn, false)
        })
      }
    },
    server: function (server) {
      this.serverItem = server
    }
  },
  methods: {
    // Adjust dialog position
    adjustPosition: function (server, index) {
      var height = 0
      var item = document.getElementsByClassName('server-item')
      for (var i = 0, l = index + 1; i < l; i++) {
        height += item[i].offsetHeight + 20
      }
      this.position.top = height + 'px'
    },
    add: function () {
      var _this = this
      var value = this.value.split(',')
      var server = this.serverItem
      var resources = server.resources
      var id = server.id
      for (var i = 0, l = value.length; i < l; i++) {
        resources.push(value[i])
      }
      server.resources = resources
      axios({
        method: 'put',
        responseType: 'json',
        url: `/agents/${id}`,
        data: server
      })
        .then((response) => {
          this.ifVisible = false
          this.value = ''
          _this.$emit('add-complete', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    close: function () {
      this.ifVisible = false
      document.body.removeEventListener('click', this.clickFn, false)
    },
    handleInput: function (event) {
      var value = event.target.value
      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleFocus: function (event) {
      this.$emit('focus', event)
    },
    handleBlur: function (event) {
      this.$emit('focus', event)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.cr-dialog{
    position: absolute;
    left: 112px;
    width: 544px;
    padding: 12px 12px 16px 12px;
    background-color: #fff;
    border: 1px solid #00b4cf;
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
}
.triangle{
    position: absolute;
    top: -10px;
    left: 20px;
    width: 18px;
    height: 18px;
    border-top: 1px solid #00b4cf;
    border-left: 1px solid #00b4cf;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 999;
    background: #fff;
    transform: rotate(45deg);
}
.cr-dialog>i{
    float: right;
    text-align: right;
    color: #00b4cf;
    font-size: 20px;
    cursor: pointer;
}
.cr-dialog>h2{
    height: 20px;
    line-height: 20px;
    margin-top: 18px;
}
.cr-dialog>input{
    width: 100%;
    display: block;
    height: 36px;
    margin-top: 10px;
    border: 1px solid #999;
    color:#00b4cf;
    border-radius: 4px;
    text-indent: 16px;
    box-shadow: 1px 0px 1px rgba(0,0,0,0.3);
}
.cr-dialog>.button-group{
    margin-top: 22px;
}
.cr-dialog>.button-group button{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
}
.cr-dialog>.button-group .add{
    width: 126px;
    text-align: center;
    background-color: #00b4cf;
    cursor: pointer;
}
.cr-dialog>.button-group .cancle{
    width: 120px;
    text-align: center;
    background-color: #2d4054;
    margin-left: 20px;
    cursor: pointer;
}
</style>
