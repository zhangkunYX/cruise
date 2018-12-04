<template>
  <div class='history'>
    <h2>History</h2>
    <ul>
        <li v-for="(item, index) in history" :key="index">
            <span>{{item.text}}</span>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HistoryList',
  data () {
    return {
      history: [
        {text: 'bjstdmngbdr01/Acceptance_test'},
        {text: 'bjstdmngbdr02/Acceptance_test'},
        {text: 'bjstdmngbdr03/Acceptance_test'},
        {text: 'bjstdmngbdr04/Acceptance_test'},
        {text: 'bjstdmngbdr05/Acceptance_test'},
        {text: 'bjstdmngbdr06/Acceptance_test'},
        {text: 'bjstdmngbdr07/Acceptance_test'},
        {text: 'bjstdmngbdr08/Acceptance_test'},
        {text: 'bjstdmngbdr09/Acceptance_test'},
        {text: 'bjstdmngbdr10/Acceptance_test'},
        {text: 'bjstdmngbdr11/Acceptance_test'},
        {text: 'bjstdmngbdr12/Acceptance_test'},
        {text: 'bjstdmngbdr13/Acceptance_test'}
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.history{
    position: absolute;
    width: 236px;
    padding: 0 20px 0 14px;
    background-color:  #2d4054;
    bottom: 14px;
}
.history h2{
    padding: 10px 0;
    font-size: 24px;
    color: #ccc;
}
.history ul li{
    position: relative;
    font-size: 12px;
    color: #999;
    height: 28px;
    line-height: 28px;
}
.history li:hover{
    color: #00b4cf;
}
.history li>span{
    display: inline-block;
    margin-left: 24px;
    width: 211px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.history li>span::before{
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    position: absolute;
    left: 8px;
    top: 12px;
    font-size: 12px;
    background: #999;
    border-radius: 50%;
}
</style>
