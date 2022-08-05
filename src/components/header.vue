<template>
  <Toolbar>
    <template #start>
      <img alt="Logo" src="../assets/logo.png" width="40" height="40" />
      <h1 class="text-primary text-2xl font-bold ml-5">SPRING - VUEJS CRUD</h1>
    </template>

    <template #end>
      <Button
        icon="pi pi-info"
        class="p-button-rounded p-button-outlined mr-4"
      />
      <Button
        icon="pi pi-github"
        class="p-button-rounded p-button-outlined mr-4"
      />
      <Button
        icon="pi pi-linkedin"
        class="p-button-rounded p-button-outlined mr-4"
      />
    </template>
  </Toolbar>
</template>