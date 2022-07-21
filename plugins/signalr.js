import Vue from 'vue'
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr'
import { decode } from 'base64-arraybuffer'
const sig = {}

const connection = new HubConnectionBuilder()
  .withUrl(`https://e2e.azurewebsites.net/e2echat`)
  .configureLogging(LogLevel.Error)
  .withAutomaticReconnect()
  .build()

window.decrypt = async (privateKey, cipherText) => {
  const tempkey = JSON.parse(atob(privateKey))
  const key = await window.crypto.subtle.importKey(
    'jwk',
    tempkey,
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['decrypt']
  )

  const data = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    cipherText
  )
  return data
}

window.addEventListener('authenticated', (e) => {
  if (connection.state !== HubConnectionState.Connected) {
    console.log('auth event fired: ', e)
    connection.baseUrl = `https://e2e.azurewebsites.net/e2echat?apiKey=${localStorage.getItem(
      'token'
    )}`
    connection
      .start()
      .then((con) => {
        window.dispatchEvent(
          new CustomEvent('connectionReady', { detail: true })
        )
      })
      .catch((e) => console.log('Error while connecting....' + e.message))
  }
})

connection.on('MessageReceived', async (channel, data) => {
  const cipher = decode(data)
  const privateKey = localStorage.getItem('privateKey')
  const decrypted = await decrypt(privateKey, cipher)
  const decoded = String.fromCharCode(...new Uint8Array(decrypted))
  const message = JSON.parse(atob(decoded))
  const messagesStr = localStorage.getItem(channel)
  let storedMessages = []
  if (messagesStr) {
    storedMessages = JSON.parse(messagesStr)
  }
  storedMessages.push(message)
  localStorage.setItem(channel, JSON.stringify(storedMessages))
})

Vue.prototype.$sig = connection
