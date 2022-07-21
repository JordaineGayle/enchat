<template>
  <div id="message" :class="message.Sender !== userId ? 'gradient' : 'no-gradient'">
    <p class="body-1">{{message.Message}}xddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
    <p class="caption">{{humanTime(message.Date)}}</p>
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
  padding: 0.5em;
  margin: 0.6em;
  border-radius: 10px;
  width: 80%;
  word-break: break-word;
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
