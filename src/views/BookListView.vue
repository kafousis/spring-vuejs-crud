<template>
  <div class="text-color-secondary text-3xl font-semibold m-5">
    Books
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-secondary p-button-outlined ml-5"
    />
  </div>

  <Message class="mx-5" :closable="false" :severity="messageSeverity">{{
    messageContent
  }}</Message>

  <li class="list-none mx-5" v-for="book in $store.state.books" :key="book.id">
    <Card class="mb-3 p-3 shadow-4">
      <template #title>{{ book.title }}</template>
      <template #subtitle>{{ book.allAuthors }}</template>
      <template #footer>
        <Button
          icon="pi pi-pencil"
          label="Edit"
          class="p-button-primary"
          style="width: 150px"
        />
        <Button
          icon="pi pi-trash"
          label="Delete"
          class="p-button-secondary ml-6"
          style="width: 150px"
        />
      </template>
    </Card>
  </li>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getBooks");
  },
  computed: {
    messageSeverity: {
      get() {
        return this.$store.state.messageSeverity;
      },
    },
    messageContent: {
      get() {
        return this.$store.state.messageContent;
      },
    },
  },
};
</script>