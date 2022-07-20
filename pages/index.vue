<template>
  <div class="main">
    <div class='contents'>
      <p class="head-1">ENCHAT</p>
      <p class="title-1">connecting the globe...</p>
      <div class="actions">
        <vs-button size="large"
                   color="#FA003F"
                   gradient
                   @click="$router.push('/register')"
        >Get Started</vs-button>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

.main{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contents{
  display: block;
  text-align: center;
  line-height: 0;
}

.actions{
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}


</style>
