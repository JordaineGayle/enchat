<template>
  <div class="main">
    <div class='nav'>
      <p class="head-3 p-2">Contacts</p>
      <div class="search p-2">
        <vs-input color="#FA003F" shadow placeholder="search" style="width: 100%"
                  @keydown="searchContacts"
                  v-model="searchText">
          <template #icon>
            <i class='bx bx-search-alt-2' ></i>
          </template>
        </vs-input>
      </div>
    </div>
    <ContactList v-if="!isLoading && contacts.length > 0" :contacts="filteredContacts"/>
    <div class="no-contacts title-2 text-center"
         v-else-if="!isLoading && contacts.length <= 0">Sorry! no contacts yet<br/>Unable to start a conversation</div>
  </div>
</template>

<script>
import ContactList from "../components/ContactListComponent";
export default {
  created() {
    this.token = localStorage.getItem('token');
    if(!this.token)
      this.$router.push("/");

    this.loading = this.$vs.loading({
      type: 'circles',
      color: '#FA003F'
    });
    this.getUsers();

    window.dispatchEvent(new CustomEvent('authenticated', {detail: true}));
  },
  components: {ContactList},
  data(){
    return{
      searchText: "",
      isLoading: true,
      token: undefined,
      loading: null,
      contacts: [],
      filteredContacts: []
    }
  },
  methods: {
    getUsers()
    {
      this.$axios.$get(
        '/api/Users/GetContacts',
        {
          headers: {
            ApiKey: this.token
          }
        }
      )
      .then(res => {
        this.contacts = res;
        this.filteredContacts = [...this.contacts];
        this.closeLoading();
      })
      .catch(err => {
        console.log(err.errors)
        this.closeLoading();
      });
    },
    closeLoading() {
      this.isLoading = false;
      this.loading.close();
    },
    searchContacts(){
      if(this.searchText !== "" && this.searchText !== null && this.searchText !== undefined){
        this.filteredContacts = this.contacts.filter(x =>
          x.Email.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
          || x.Name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
        );

      }
      else
      {

        this.filteredContacts = [...this.contacts];

      }
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
