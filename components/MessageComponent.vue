<template>
  <div id="message" :class="message.Sender !== userId ? 'gradient' : 'no-gradient'">
    <p class="body-2">{{message.Message}}</p>
    <p class="caption" :style="message.Sender !== userId ? 'align-self: flex-end' : 'align-self: flex-start' ">{{humanTime(message.Date)}}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "MessageComponent",
  props: ["message"],
  created() {
    this.userId = localStorage.getItem("token");
  },
  data(){
    return {
      userId: null
    }
  },
  methods: {
    humanTime: function(date){
      return moment(new Date(date)).calendar();
    }
  }
}
</script>

<style scoped>

#message{
  padding: 0.8em;
  margin: 0.6em;
  border-radius: 10px;
  width: 80%;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  line-height: 0;
}

.gradient {
  text-align: left;
  color: white;
  background: rgb(250,0,63);
  background: linear-gradient(45deg, rgba(250,0,63,1) 34%, rgba(250,0,101,0.8295693277310925) 100%);
}

.no-gradient{
  align-self: flex-end;
  text-align: right;
  color: black;
  background-color: #fff;
}


</style>
