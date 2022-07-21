<template>
  <div class="main">
    <div class='nav' >
      <ContactComponent
        v-if="!isLoading"
        :contact="contact"
        :is-typing="isTyping"
      />
    </div>
    <ConversationComponent />
  </div>
</template>

<script>
import ContactComponent from "../../components/ConversationContactCompnent";
import ConversationComponent from "../../components/ConversationComponent";
import {HubConnectionState} from "@microsoft/signalr";
import { AvatarGenerator } from 'random-avatar-generator';
export default {
  created() {
    this.token = localStorage.getItem('token');
    if(!this.token)
      this.$router.push("/");

    this.loading = this.$vs.loading({
      type: 'circles',
      color: '#FA003F'
    });

    this.contactId = this.$route.params.id;

    console.log("contacid: ",this.contactId)

    this.getContact(this.contactId);

    window.dispatchEvent(new CustomEvent('authenticated', {detail: true}));

    console.log("connection state: ",this.$sig.state)

    if(this.$sig.state === HubConnectionState.Connected){
      this.$sig.invoke("StartConversation", this.contactId);
    }else{
      window.addEventListener("connectionReady", (e) =>{
        this.$sig.invoke("StartConversation", this.contactId);
      })
    }


    this.$sig.on('ConversationStarted', (data) => {
      this.conversationResponse = data
    })

    this.$sig.on('IsTyping', (channel, message) => {
      this.isTyping = true;
      setTimeout(()=>{
        this.isTyping = false
      },3000)
    })


  },
  data(){
    return{
      isLoading: true,
      isTyping: false,
      token: undefined,
      loading: null,
      contactId: null,
      contact: null,
      conversationResponse: null,
      generator: new AvatarGenerator()
    }
  },
  components: {ConversationComponent, ContactComponent},
  methods: {
    getContact(id){
      this.$axios.$get(
        `/api/Users/GetContact/${id}`,
        {
          headers: {
            ApiKey: this.token
          }
        }
      )
        .then(res => {
          this.contact = res;
          this.contact.Avatar = this.generator.generateRandomAvatar();
          this.closeLoading();
        })
        .catch(err => {
          console.log(err.errors);
          this.closeLoading();
        });
    },
    closeLoading() {
      this.isLoading = false;
      this.loading.close();
    }
  }
}

</script>

<style scoped>

.main{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav{
  line-height: 0;
}

.no-contacts{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #cbcaca!important;
}


</style>
