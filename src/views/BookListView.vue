<template>
  <div class="text-color-secondary text-3xl font-semibold m-5">
    Books
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-secondary p-button-outlined ml-5"
    />
  </div>

  <Card>
    <template #title>My wonderful book</template>
    <template #subtitle>Giannis Kafousis, Vaso Kountouri</template>
    <template #footer>
      <Button
        icon="pi pi-pencil"
        label="Edit"
        class="p-button-primary"
        style="width: 180px"
      />
      <Button
        icon="pi pi-trash"
        label="Delete"
        class="p-button-secondary ml-6"
        style="width: 180px"
      />
    </template>
  </Card>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getBooks").then(
      (response) => {
        console.log("Got some data");
        console.log(response);
      },
      (error) => {
        console.error(
          "Got nothing from server. Prompt user to check internet connection and try again"
        );
        console.log(error);
      }
    );
  },
};
</script>