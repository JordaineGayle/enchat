<template>
  <div class="conversation-area">
    <div class="messages-area">
      <MessageComponent v-for="(message,i) in messages" :message="message" :key="i"/>
    </div>
    <div class="action">
      <vs-input style="width: 100%!important;" v-model="msg" placeholder="Mesage..."  square/>
      <vs-button color="#FA003F" icon flat square :disabled="!msg" @click="sendMessage">
        <i class='bx bxs-send'></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import MessageComponent from "./MessageComponent";
export default {
  name: "ConversationComponent",
  components: {MessageComponent},
  props: ['messages'],
  created() {
    this.$sig.on("ConversationStarted", (data) =>
    {
      this.conversationResponse = data;
    })

    this.$sig.on("MessageReceived", async (channel, data) =>
    {
      if(channel === this.conversationResponse.ConversationId)
      {
        console.log("Message to decrypt: ",data);
        const privateKey = localStorage.getItem('privateKey');
        const decrypted = await this.decrypt(privateKey,data);
        const message = JSON.parse(atob(decrypted));
        this.messages.push(message);
      }
    });
  },
  data(){
    return {
      conversationResponse: null,
      msg: ''
    }
  },
  methods: {
    async sendMessage(){
      const publicKey = this.conversationResponse.PublicKey;
      const message = {
        Sender: localStorage.getItem('token'),
        Receiver: this.$route.params.id,
        Message: this.msg,
        Date: new Date()
      }
      this.msg = null;
      this.messages.push(message);
      const encrypted = await this.encrypt(publicKey,message);
      await this.$sig.invoke("SendMessage", this.$route.params.id, encrypted);
    }
  }
}
</script>

<style scoped>

.conversation-area{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.messages-area{
  flex-grow: 2;
  background-color: #f8f8f8;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.action{
  display: flex;
  padding-left: 0.3em;
}

</style>
