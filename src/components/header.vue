<template>
  <Toolbar class="flex align-items-center">
    <template #start>
      <img alt="Logo" src="../assets/logo.png" width="40" height="40" />
      <div class="text-primary text-3xl font-bold ml-5">
        SPRING - VUEJS CRUD
      </div>
    </template>

    <template #end>
      <router-link to="/books" custom v-slot="{ navigate }">
        <Button
          icon="pi pi-home"
          class="p-button-rounded p-button-outlined mr-4"
          @click="navigate"
        />
      </router-link>
      <router-link to="/about" custom v-slot="{ navigate }">
        <Button
          icon="pi pi-info"
          class="p-button-rounded p-button-outlined"
          @click="navigate"
        />
      </router-link>

      <i class="pi pi-ellipsis-v p-toolbar-separator mx-6" />

      <Button
        icon="pi pi-github"
        class="p-button-rounded p-button-outlined mr-4"
        @click="githubClicked"
      />
      <Button
        icon="pi pi-linkedin"
        class="p-button-rounded p-button-outlined mr-4"
        @click="linkedinClicked"
      />
    </template>
  </Toolbar>
</template>

<script>
export default {
  name: "app",
  methods: {
    githubClicked() {
      window.open("https://github.com/kafousis/spring-vuejs-crud");
    },
    linkedinClicked() {
      window.open("https://www.linkedin.com/in/gkafousis/");
    },
  },
};
</script>