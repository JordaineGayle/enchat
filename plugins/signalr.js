import Vue from 'vue';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const sig = {};

let connection = new HubConnectionBuilder()
  .withUrl(`https://e2e.azurewebsites.net/e2echat`)
  .configureLogging(LogLevel.Error)
  .withAutomaticReconnect()
  .build();

window.on('authenticated', (e) =>{
  console.log("auth event fired: ",e);
  connection.baseUrl = `https://e2e.azurewebsites.net/e2echat?${localStorage.getItem('token')}`;
  connection.start().then(con => {
    console.log("connection",con);
  }).catch(e => console.log("Error while connecting...."+e.message));
})

Vue.prototype.$sig = connection;
