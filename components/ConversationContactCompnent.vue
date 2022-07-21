<template>
  <div :key="contact.id" class="contact-area"
       @click="$router.push(`/conversation/${contact.id}`)">
    <div class="contact">
      <vs-button to="/contacts" color="#ffffff" transparent>
        <i class='bx bx-arrow-back'></i>
      </vs-button>
      <vs-avatar size="60" history history-gradient circle>
        <img :src="contact.Avatar">
      </vs-avatar>
      <div class="contact-info">
        <p class="body-2">{{contact.Name}}</p>
        <p class="caption">{{isTyping ? 'Typing...' : contact.Email}}</p>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: "ContactComponent",
  props: ["contact","isTyping"],
  data(){
    return {

    }
  }
}
</script>

<style scoped>

.contact{
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  /*align-items: center;*/
  /*margin-bottom: 1em;*/
}

.contact-info{
  display: flex;
  flex-direction: column;
  margin-left: 0.5em;
  transition: background-color 0.4s;
}

.contact-area{
  color: white;
  background: rgb(250,0,63);
  background: linear-gradient(45deg, rgba(250,0,63,1) 34%, rgba(250,0,101,1) 100%);
}
</style>
