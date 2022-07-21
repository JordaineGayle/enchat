<template>
  <div class="conversation-area">
    <div class="messages-area">
      <MessageComponent v-for="(message,i) in messages" :use-gradient="false" :message="message" :key="i"/>
    </div>
    <div class="action">
      <vs-input style="width: 100%!important;" placeholder="Mesage..."  square/>
      <vs-button color="#FA003F" icon flat square>
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
  props: ['messages']
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
