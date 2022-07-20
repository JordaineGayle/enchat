<template>
  <div class="main">
    <div class='nav'>
      <vs-button flat to="/" color="#FA003F" square transparent>
        <i class='bx bx-arrow-back'></i>
        BACK
      </vs-button>
    </div>
    <div class='contents'>
      <p class="head-2">Sign Up</p>
      <div class="form">
        <vs-input color="#FA003F" v-model="registerRequest.FirstName" placeholder="First Name" style="margin: 0.5em">
          <template #icon>
            <i class='bx bx-user'></i>
          </template>
        </vs-input>

        <vs-input color="#FA003F" v-model="registerRequest.LastName" placeholder="Last Name" style="margin: 0.5em">
          <template #icon>
            <i class='bx bx-user'></i>
          </template>
        </vs-input>

        <vs-input color="#FA003F" v-model="registerRequest.Email" placeholder="Email Address" style="margin: 0.5em">
          <template #icon>
            <i class='bx bx-envelope' ></i>
          </template>
        </vs-input>

        <vs-input color="#FA003F" type="password" v-model="registerRequest.Password" placeholder="Password" style="margin: 0.5em">
          <template #icon>
            <i class='bx bx-lock-alt' ></i>
          </template>
        </vs-input>
      </div>
      <div class="actions">
        <vs-button size="large"
                   color="#FA003F"
                   gradient
                   :loading="isLoading"
                   @click="registerUser"
        >Register</vs-button>
      </div>
      <div class="actions">
        <p style="cursor: pointer" class="body-1">Already have an account ? <span class="text-red" @click="$router.push('/login')">Login</span></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      isLoading: false,
      registerRequest: {
        Email: '',
        Password: '',
        FirstName: '',
        LastName: '',
        PublicKey: '123456'
      }
    }
  },
  methods: {
    registerUser()
    {
      this.isLoading = true;
      this.$axios.$post(
        '/api/Users/Register',
        this.registerRequest
      )
      .then(res => {
        console.log(res)
        this.isLoading = false;
        localStorage.setItem("token",res.Token);
        this.$router.push('/contacts');
      })
      .catch(err => {
        console.error(err)
        this.isLoading = false;
        this.errorNotification(2000)
      });
    },
  errorNotification(duration) {
    this.$vs.notification({
      buttonClose: false,
      flat: true,
      color: 'danger',
      position: 'bottom-center',
      duration: duration,
      progress: 'auto',
      title: 'Request Failed',
      text: `please check the field a send the request again.`
    })
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
  justify-content: space-between;
}

.nav{
  flex-grow: 1;
}

.contents{
  flex-grow: 2;
  display: block;
  text-align: center;
  line-height: 0;
}

.form{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 4rem;
}

.actions{
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}


</style>
