import Vue from 'vue'

const Cryptography = {
  install(Vue) {
    Vue.prototype.generateKey = async () => {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      )

      const publicKey = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.publicKey
      )

      const privateKey = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.privateKey
      )

      return {
        publicKey: btoa(JSON.stringify(publicKey)),
        privateKey: btoa(JSON.stringify(privateKey)),
      }
    }

    Vue.prototype.encrypt = async (publicKey, data) => {
      const tempkey = JSON.parse(atob(publicKey))
      const key = await window.crypto.subtle.importKey(
        'jwk',
        tempkey,
        {
          name: 'RSA-OAEP',
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        false,
        ['encrypt']
      )

      const enc = new TextEncoder()
      const encodedData = enc.encode(btoa(JSON.stringify(data)))
      const ciperText = await window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP',
        },
        key,
        encodedData
      )
      return ciperText
    }

    Vue.prototype.decrypt = async (privateKey, cipherText) => {
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
  },
}
Vue.use(Cryptography)
