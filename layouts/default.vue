<template>
  <Nuxt />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Acme&family=Caveat&family=Raleway&display=swap');

html, body{
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.main-body, #__nuxt, #__layout, .main-content, .main-area{
  height: 100%;
  width: 100%;
}

.head-1{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(36px + 2.6vw)!important;
}

.head-2{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(32px + 2.05vw)!important;
}

.head-3{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(26px + 1.65vw)!important;
}

.head-4{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(24px + 1.55vw)!important;
}

.head-5{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(16px + 1.04vw)!important;
}

.head-6{
  font-family: 'Acme', sans-serif!important;
  font-size: calc(12px + 0.79vw)!important;
}

.title-1{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(12px + 0.79vw)!important;
}

.title-2{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(12px + 0.85vw)!important;
  font-weight: bolder!important;
}


.subtitle-1{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(8px + 0.79vw)!important;
}

.subtitle-2{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(8px + 0.85vw)!important;
  font-weight: bolder!important;
}

.body-1{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(10px + 0.40vw)!important;
}

.body-2{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(12px + 0.40vw)!important;
  font-weight: bolder!important;
}

.t-btn{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(8px + 0.40vw)!important;
  font-weight: bolder!important;
}

.caption{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(8px + 0.53vw)!important;
}

.overline{
  font-family: 'Raleway', sans-serif!important;
  font-size: calc(9px + 0.40vw)!important;
}

.signature{
  font-family: 'Caveat', cursive!important;
  font-size: calc(12px + 0.79vw)!important;
}

.bg-blue{
  background-color: #044dc2!important;
}

.bg-grey{
  background-color: #f8f8f8!important;
}

.text-blue{
  color: #044dc2!important;
}

.text-red{
  color: #FA003F!important;
}

.text-white{
  color: white!important;
}

.text-black{
  color: black!important;
}

.text-grey{
  color: #cbcaca !important;
}

.text-center{
  text-align: center!important;
}

.text-left{
  text-align: left!important;
}

.text-right{
  text-align: right!important;
}

.text-justify{
  text-align: justify-all!important;
}

.text-bold{
  font-weight: bold!important;
}

.text-bolder{
  font-weight: bolder!important;
}

.text-light{
  font-weight: normal!important;
}

.text-lighter{
  font-weight: lighter!important;
}

.font-8{
  font-size: calc(4px + 0.25vw)!important;
}

.font-10{
  font-size: calc(5px + 0.33vw)!important;
}

.font-12{
  font-size: calc(6px + 0.40vw)!important;
}

.font-16{
  font-size: calc(8px + 0.53vw)!important;
}

.font-18{
  font-size: calc(9px + 0.6vw)!important;
}

.font-24{
  font-size: calc(12px + 0.79vw)!important;
}

.font-32{
  font-size: calc(16px + 1.04vw)!important;
}

.font-48{
  font-size: calc(24px + 1.55vw)!important;
}

.font-52{
  font-size: calc(26px + 1.65vw)!important;
}

.font-64{
  font-size: calc(32px + 2.05vw)!important;
}

.font-72{
  font-size: calc(36px + 2.6vw)!important;
}

.p-0{
  padding:0px!important;
}
.p-05{
  padding:5px!important;
}


.p-1{
  padding:10px!important;
}

.p-2{
  padding:20px!important;
}

.p-3{
  padding:30px!important;
}

.p-4{
  padding:40px!important;
}

.p-5{
  padding:50px!important;
}

.p-6{
  padding:60px!important;
}

.p-7{
  padding:70px!important;
}

.p-8{
  padding:80px!important;
}

.p-9{
  padding:90px!important;
}

.p-10{
  padding:100px!important;
}

.m-0{
  margin:0px!important;
}

.m-1{
  margin:10px!important;
}

.m-2{
  margin:20px!important;
}

.m-3{
  margin:30px!important;
}

.m-4{
  margin:40px!important;
}

.m-5{
  margin:50px!important;
}

.m-6{
  margin:60px!important;
}

.m-7{
  margin:70px!important;
}

.m-8{
  margin:80px!important;
}

.m-9{
  margin:90px!important;
}

.m-10{
  margin:100px!important;
}

.el-card{
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05)!important;
}

.round-1-5{
  border-radius: 5%!important;
}

.round-1{
  border-radius: 10%!important;
}

.round-2{
  border-radius: 20%!important;
}

.round-3{
  border-radius: 30%!important;
}

.round-4{
  border-radius: 40%!important;
}

.round-5{
  border-radius: 50%!important;
}

.vs-dialog{
  width:400px;
}

.vs-input{
  width: 100%;
}


.divider{
  height: 1px;
  width: 100%;
  background-color: #f3f3f3;
}
</style>
