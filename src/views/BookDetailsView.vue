  <template>
  <div class="text-color-secondary text-3xl font-semibold m-5">{{ title }}</div>
  <Message class="mx-5" :closable="false" :severity="messageSeverity">{{
    messageContent
  }}</Message>
  <Fieldset class="mx-6" legend="Godfather I">
    <div class="mb-4">
      <label for="id" class="block text-base font-medium mb-2">Id</label>
      <InputText id="id" type="text" class="w-full" v-model="bookId" disabled />
    </div>

    <div class="mb-4">
      <label for="title" class="block text-base font-medium mb-2">Title</label>
      <InputText id="title" type="text" class="w-full" v-model="bookTitle" />
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
        optionValue="id"
        v-model="bookFirstAuthor"
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
        optionValue="id"
        v-model="bookSecondAuthor"
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
        optionValue="id"
        v-model="bookGenre"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <label for="isbn" class="block text-base font-medium mb-2">ISBN</label>
      <InputText id="isbn" type="text" class="w-full" v-model="bookIsbn" />
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
        optionValue="id"
        v-model="bookPublisher"
        class="w-full"
      />
    </div>

    <div class="grid mb-4">
      <div class="col">
        <label for="pages" class="block text-base font-medium mb-2"
          >Pages</label
        >
        <InputText
          id="pages"
          type="text"
          class="w-full"
          v-model="bookTotalPages"
        />
      </div>
      <div class="col">
        <label for="year" class="block text-base font-medium mb-2">Year</label>
        <InputText
          id="year"
          type="text"
          class="w-full"
          v-model="bookPublishedYear"
        />
      </div>
    </div>

    <div class="grid my-6">
      <div class="col">
        <router-link to="/books" custom v-slot="{ navigate }">
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="w-full p-button-outlined"
            @click="navigate"
          />
        </router-link>
      </div>
      <div class="col">
        <Button
          label="Save"
          icon="pi pi-check"
          class="w-full"
          :disabled="isSaveBtnDisabled"
          @click="validate()"
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
  created() {
    this.$store.commit("selectBookById", this.id);
  },
  methods: {
    validate() {
      console.log(this.$state.selectedBook);
    },
  },
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
    genres: {
      get() {
        return this.$store.state.genres;
      },
    },
    publishers: {
      get() {
        return this.$store.state.publishers;
      },
    },
    bookId: {
      get() {
        return this.$store.state.selectedBook.id;
      },
    },
    bookTitle: {
      get() {
        return this.$store.state.selectedBook.title;
      },
      set(title) {
        this.$store.commit("updateTitle", title);
      },
    },
    bookFirstAuthor: {
      get() {
        return this.$store.state.selectedBook.authorsDetails[0].id;
      },
      set(authorId) {
        this.$store.commit("updateFirstAuthor", authorId);
      },
    },
    bookSecondAuthor: {
      get() {
        if (this.$store.state.selectedBook.authorsDetails.length == 2) {
          return this.$store.state.selectedBook.authorsDetails[1].id;
        } else {
          return null;
        }
      },
      set(authorId) {
        this.$store.commit("updateSecondAuthor", authorId);
      },
    },
    bookGenre: {
      get() {
        return this.$store.state.selectedBook.genreDetails.id;
      },
      set(genre) {
        this.$store.commit("updateGenre", genre);
      },
    },
    bookIsbn: {
      get() {
        return this.$store.state.selectedBook.isbn;
      },
      set(isbn) {
        this.$store.commit("updateIsbn", isbn);
      },
    },
    bookPublisher: {
      get() {
        return this.$store.state.selectedBook.publisherDetails.id;
      },
      set(publisher) {
        this.$store.commit("updatePublisher", publisher);
      },
    },
    bookTotalPages: {
      get() {
        return this.$store.state.selectedBook.totalPages;
      },
      set(totalPages) {
        this.$store.commit("updateTotalPages", totalPages);
      },
    },
    bookPublishedYear: {
      get() {
        return this.$store.state.selectedBook.publishedYear;
      },
      set(year) {
        this.$store.commit("updatePublishedYear", year);
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