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
          @click="$store.commit('deleteBookDialogOpen', book)"
        />
      </template>
    </Card>
  </li>

  <Dialog
    header="Confirmation"
    v-model:visible="displayDeleteBookDialog"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to proceed?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="$store.commit('deleteBookDialogClose')"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="$store.dispatch('deleteBook')"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getBooks");
  },
  methods: {},
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
    displayDeleteBookDialog: {
      get() {
        return this.$store.state.displayDeleteBookDialog;
      },
    },
  },
};
</script>