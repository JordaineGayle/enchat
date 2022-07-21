<template>
  <div class="conversation-area">
    <div class="messages-area">
      <MessageComponent
        v-for="(message, i) in messages"
        :key="i"
        :message="message"
      />
    </div>
    <div class="action">
      <vs-input
        v-model="msg"
        style="width: 100% !important"
        placeholder="Mesage..."
        square
      />
      <vs-button
        color="#FA003F"
        icon
        flat
        square
        :disabled="!msg"
        @click="sendMessage"
      >
        <i class="bx bxs-send"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import { encode, decode } from 'base64-arraybuffer'
import MessageComponent from './MessageComponent'
export default {
  name: 'ConversationComponent',
  components: { MessageComponent },
  data() {
    return {
      conversationResponse: null,
      msg: '',
      messages: [],
    }
  },
  created() {
    this.$sig.on('ConversationStarted', (data) => {
      this.conversationResponse = data
      const messagesStr = localStorage.getItem(this.conversationResponse.ConversationId);
      this.messages = [];
      if(messagesStr){
        this.messages = JSON.parse(messagesStr);
      }

    })

    this.$sig.on('MessageReceived', async (channel, data) => {
      if (channel === this.conversationResponse.ConversationId) {
        const cipher = decode(data)
        const privateKey = localStorage.getItem('privateKey')
        const decrypted = await this.decrypt(privateKey, cipher)
        const decoded = String.fromCharCode(...new Uint8Array(decrypted))
        const message = JSON.parse(atob(decoded))
        this.messages.push(message)
      }
    })
  },
  methods: {
    async sendMessage() {
      const publicKey = this.conversationResponse.PublicKey
      const message = {
        Sender: localStorage.getItem('token'),
        Receiver: this.$route.params.id,
        Message: this.msg,
        Date: new Date(),
      }
      this.messages.push(message)
      const encrypted = await this.encrypt(publicKey, message)
      const encoded = encode(encrypted)
      await this.$sig.invoke('SendMessage', this.$route.params.id, encoded)
      this.msg = null
      let messagesStr = localStorage.getItem(this.conversationResponse.ConversationId);
      let storedMessages = [];
      if(messagesStr){
        storedMessages = JSON.parse(messagesStr);
      }
      storedMessages.push(message);
      localStorage.setItem(this.conversationResponse.ConversationId,JSON.stringify(storedMessages));

    },
  },
}
</script>

<style scoped>
.conversation-area {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.messages-area {
  flex-grow: 2;
  background-color: #f8f8f8;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.action {
  display: flex;
  padding-left: 0.3em;
}
</style>
