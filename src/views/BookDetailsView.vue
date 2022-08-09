  <template>
  <div class="text-color-secondary text-3xl font-semibold m-5">Edit Book</div>
  <Fieldset class="mx-6" legend="Godfather I">
    <div class="mb-4">
      <label for="id" class="block text-base font-medium mb-2">Id</label>
      <InputText id="id" type="text" class="w-full" disabled />
    </div>

    <div class="mb-4">
      <label for="title" class="block text-base font-medium mb-2">Title</label>
      <InputText id="title" type="text" class="w-full" />
    </div>

    <div class="mb-4">
      <label for="firstAuthor" class="block text-base font-medium mb-2"
        >First Author</label
      >
      <Dropdown
        id="firstAuthor"
        placeholder="Select an Author"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="secondAuthor" class="block text-base font-medium mb-2"
        >Second Author</label
      >
      <Dropdown
        id="secondAuthor"
        placeholder="Select an Author"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="genre" class="block text-base font-medium mb-2"
        >Publisher</label
      >
      <Dropdown id="genre" placeholder="Select a Genre" class="w-full" />
    </div>

    <div class="mb-4">
      <label for="isbn" class="block text-base font-medium mb-2">ISBN</label>
      <InputText id="isbn" type="text" class="w-full" />
    </div>

    <div class="mb-4">
      <label for="publisher" class="block text-base font-medium mb-2"
        >Genre</label
      >
      <Dropdown
        id="publisher"
        placeholder="Select a Publisher"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="pages" class="block text-base font-medium mb-2">Pages</label>
      <InputText id="pages" type="text" class="w-full" />
    </div>

    <div class="mb-4">
      <label for="year" class="block text-base font-medium mb-2">Year</label>
      <InputText id="year" type="text" class="w-full" />
    </div>
  </Fieldset>
</template>

<script>
export default {
  name: "BookDetailsView",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>