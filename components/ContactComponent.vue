<template>
  <div :key="contactId" class="contact-area"
       @click="$router.push(`/conversation/${contactId}`)">
    <div class="contact">
      <vs-avatar size="60" history history-gradient circle>
        <img :src="generator.generateRandomAvatar()">
      </vs-avatar>
      <div class="contact-info">
        <p class="body-2">{{contactName}}</p>
        <p class="caption">{{contactEmail}}</p>
      </div>
    </div>
    <div v-if="showDivider" class="divider"></div>
  </div>
</template>

<script>
import { AvatarGenerator } from 'random-avatar-generator';


export default {
  name: "ContactComponent",
  props: ["showDivider","contactId", "contactName","contactEmail"],
  data(){
    return {
      generator: new AvatarGenerator()
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

.contact-area:hover{
  background-color: #f3f3f3;
  cursor: pointer;
  transition: background-color 0.4s;
}
</style>
