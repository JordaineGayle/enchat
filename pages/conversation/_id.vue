<template>
  <div class="main">
    <div class='nav' >
      <ContactComponent
        v-if="!isLoading"
        :contact-id="contact.id"
        :show-divider="false"
        :contact-name="contact.Name"
        :contact-email="contact.Email"
      />
    </div>
  </div>
</template>

<script>
import ContactComponent from "../../components/ConversationContactCompnent";
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
    console.log("route",this.contactId)
    this.getContact(this.contactId);
    window.dispatchEvent(new CustomEvent('authenticated', {detail: true}));
  },
  data(){
    return{
      isLoading: true,
      token: undefined,
      loading: null,
      contactId: null,
      contact: null
    }
  },
  components: {ContactComponent},
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
