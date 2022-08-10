  <template>
  <div class="text-color-secondary text-3xl font-semibold m-5">{{ title }}</div>
  <Message class="mx-5" :closable="false" :severity="messageSeverity">{{
    messageContent
  }}</Message>
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
        >1st Author</label
      >
      <Dropdown
        id="firstAuthor"
        placeholder="Select an Author"
        :options="authors"
        optionLabel="fullName"
        v-model="firstAuthor"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="secondAuthor" class="block text-base font-medium mb-2"
        >2nd Author</label
      >
      <Dropdown
        id="secondAuthor"
        placeholder="Select an Author"
        :options="authors"
        optionLabel="fullName"
        v-model="secondAuthor"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="genre" class="block text-base font-medium mb-2">Genre</label>
      <Dropdown
        id="genre"
        placeholder="Select a Genre"
        :options="genres"
        optionLabel="name"
        v-model="genre"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="isbn" class="block text-base font-medium mb-2">ISBN</label>
      <InputText id="isbn" type="text" class="w-full" />
    </div>

    <div class="mb-4">
      <label for="publisher" class="block text-base font-medium mb-2"
        >Publisher</label
      >
      <Dropdown
        id="publisher"
        placeholder="Select a Publisher"
        :options="publishers"
        optionLabel="name"
        v-model="publisher"
        class="w-full"
      />
    </div>

    <div class="grid mb-4">
      <div class="col">
        <label for="pages" class="block text-base font-medium mb-2"
          >Pages</label
        >
        <InputText id="pages" type="text" class="w-full" />
      </div>
      <div class="col">
        <label for="year" class="block text-base font-medium mb-2">Year</label>
        <InputText id="year" type="text" class="w-full" />
      </div>
    </div>

    <div class="grid my-6">
      <div class="col">
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="w-full p-button-outlined"
        />
      </div>
      <div class="col">
        <Button
          label="Save"
          icon="pi pi-check"
          class="w-full"
          :disabled="isSaveBtnDisabled"
        />
      </div>
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
  mounted() {
    this.$store.dispatch("getAuthors");
    this.$store.dispatch("getGenres");
    this.$store.dispatch("getPublishers");
  },
  methods: {},
  computed: {
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? "Add" : "Edit"} Book`;
    },
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
    authors: {
      get() {
        return this.$store.state.authors;
      },
    },
    firstAuthor: {
      get() {
        return this.$store.state.firstAuthor;
      },
      set(author) {
        this.$store.commit("selectFirstAuthor", author);
      },
    },
    secondAuthor: {
      get() {
        return this.$store.state.secondAuthor;
      },
      set(author) {
        this.$store.commit("selectSecondAuthor", author);
      },
    },
    genres: {
      get() {
        return this.$store.state.genres;
      },
    },
    genre: {
      get() {
        return this.$store.state.genre;
      },
      set(genre) {
        this.$store.commit("selectGenre", genre);
      },
    },
    publishers: {
      get() {
        return this.$store.state.publishers;
      },
    },
    publisher: {
      get() {
        return this.$store.state.publisher;
      },
      set(publisher) {
        this.$store.commit("selectPublisher", publisher);
      },
    },
    isSaveBtnDisabled: {
      get() {
        return this.$store.state.isSaveBtnDisabled;
      },
    },
  },
};
</script>