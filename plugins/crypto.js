import Vue from 'vue'

const Cryptography = {
  install(Vue) {



    Vue.prototype.generateKey = async () => {
      let keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
      );

      const publicKey = await window.crypto.subtle.exportKey(
        "jwk",
        keyPair.publicKey
      );

      const privateKey = await window.crypto.subtle.exportKey(
        "jwk",
        keyPair.privateKey
      );

      return {
        "publicKey": btoa(JSON.stringify(privateKey)),
        "privateKey": btoa(JSON.stringify(publicKey))
      };

    }

    Vue.prototype.encrypt = async (publicKey,data) => {
      const tempkey = JSON.parse(atob(publicKey));
      const key = await window.crypto.subtle.importKey("jwk",tempkey,{
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },true,["encrypt", "decrypt"]);

      let enc = new TextEncoder();
      let encodedData = enc.encode(btoa(JSON.stringify(data)));
      const ciperText = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        key,
        encodedData
      )
      return ciperText;
    }

    Vue.prototype.decrypt = async (privateKey,cipher) => {
      let dec = new TextDecoder();
      const tempkey = JSON.parse(atob(privateKey));
      const key = await window.crypto.subtle.importKey("jwk",tempkey,{
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },true,["encrypt", "decrypt"]);

      const data = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        key,
        cipher
      )


      console.log("Cipher to be Decrypted : ", cipher)
      console.log("Decrypted Cipher: ", data)
      console.log("Decoded Cipher: ", dec.decode(data))

      return dec.decode(data);
    }
  },
}
Vue.use(Cryptography)
