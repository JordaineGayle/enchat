import Vue from 'vue';
import {HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
const sig = {};

let connection = new HubConnectionBuilder()
  .withUrl(`https://e2e.azurewebsites.net/e2echat`)
  .configureLogging(LogLevel.Error)
  .withAutomaticReconnect()
  .build();

window.addEventListener('authenticated', (e) =>{
  if(connection.state !== HubConnectionState.Connected)
  {
    console.log("auth event fired: ",e);
    connection.baseUrl = `https://e2e.azurewebsites.net/e2echat?apiKey=${localStorage.getItem('token')}`;
    connection.start().then(con => {
      console.log("connection",connection);
    }).catch(e => console.log("Error while connecting...."+e.message));
  }
})

Vue.prototype.$sig = connection;
