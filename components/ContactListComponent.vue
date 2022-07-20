<template>
  <div class="contact-list">
    <ContactComponent v-for="(contact,i) in contacts"
                      :contact-name="contact.Name"
                      :contact-email="contact.Email"
                      :show-divider="true"
                      :contact-id="contact.id"
    />
  </div>
</template>

<script>
import ContactComponent from "./ContactComponent";
export default {
  name: "ContactList",
  props: ['contacts'],
  components: {ContactComponent}

}
</script>

<style scoped>
.contact-list{
  display: block;
  line-height: 0;
  overflow-y: scroll;
}
</style>
