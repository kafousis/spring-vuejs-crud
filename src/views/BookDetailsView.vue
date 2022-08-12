  <template>
  <div class="text-color-secondary text-3xl font-semibold m-5">{{ title }}</div>
  <Message class="mx-5" :closable="false" :severity="messageSeverity">{{
    messageContent
  }}</Message>
  <Fieldset class="mx-6" :legend="fieldSetTitle">
    <div class="mb-4">
      <label for="id" class="block text-base font-medium mb-2">Id</label>
      <InputText
        id="id"
        type="text"
        class="w-full"
        v-model.number="bookId"
        disabled
      />
    </div>

    <div class="mb-4">
      <label for="title" class="block text-base font-medium mb-2">Title</label>
      <InputText
        id="title"
        type="text"
        v-model="bookTitle"
        class="w-full"
        v-bind:class="{ 'p-invalid': v$.bookTitle.$error }"
      />
      <small id="title-error" class="p-error" v-if="v$.bookTitle.$error">{{
        v$.bookTitle.$errors[0].$message
      }}</small>
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
        v-bind:class="{ 'p-invalid': v$.bookFirstAuthor.$error }"
      />
      <small
        id="firstAuthor-error"
        class="p-error"
        v-if="v$.bookFirstAuthor.$error"
        >{{ v$.bookFirstAuthor.$errors[0].$message }}</small
      >
    </div>

    <div class="mb-4">
      <label for="secondAuthor" class="block text-base font-medium mb-2"
        >2nd Author</label
      >
      <Dropdown
        id="secondAuthor"
        placeholder="Select an Author"
        :options="authorsWithNoneOption"
        optionLabel="fullName"
        optionValue="id"
        v-model="bookSecondAuthor"
        class="w-full"
        v-bind:class="{ 'p-invalid': v$.bookSecondAuthor.$error }"
      />
      <small
        id="secondAuthor-error"
        class="p-error"
        v-if="v$.bookSecondAuthor.$error"
        >{{ v$.bookSecondAuthor.$errors[0].$message }}</small
      >
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
        v-bind:class="{ 'p-invalid': v$.bookGenre.$error }"
      />
      <small id="genre-error" class="p-error" v-if="v$.bookGenre.$error">{{
        v$.bookGenre.$errors[0].$message
      }}</small>
    </div>

    <div class="mb-4">
      <label for="isbn" class="block text-base font-medium mb-2">ISBN</label>
      <InputText
        id="isbn"
        type="text"
        v-model="bookIsbn"
        class="w-full"
        v-bind:class="{ 'p-invalid': v$.bookIsbn.$error }"
      />
      <small id="isbn-error" class="p-error" v-if="v$.bookIsbn.$error">{{
        v$.bookIsbn.$errors[0].$message
      }}</small>
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
        v-bind:class="{ 'p-invalid': v$.bookPublisher.$error }"
      />
      <small
        id="publisher-error"
        class="p-error"
        v-if="v$.bookPublisher.$error"
        >{{ v$.bookPublisher.$errors[0].$message }}</small
      >
    </div>

    <div class="grid mb-4">
      <div class="col">
        <label for="pages" class="block text-base font-medium mb-2"
          >Pages</label
        >
        <InputText
          id="pages"
          type="text"
          v-model.number="bookTotalPages"
          class="w-full"
          v-bind:class="{ 'p-invalid': v$.bookTotalPages.$error }"
        />
        <small
          id="pages-error"
          class="p-error"
          v-if="v$.bookTotalPages.$error"
          >{{ v$.bookTotalPages.$errors[0].$message }}</small
        >
      </div>
      <div class="col">
        <label for="year" class="block text-base font-medium mb-2">Year</label>
        <InputText
          id="year"
          type="text"
          v-model.number="bookPublishedYear"
          class="w-full"
          v-bind:class="{ 'p-invalid': v$.bookPublishedYear.$error }"
        />
        <small
          id="year-error"
          class="p-error"
          v-if="v$.bookPublishedYear.$error"
          >{{ v$.bookPublishedYear.$errors[0].$message }}</small
        >
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  numeric,
  minLength,
  maxLength,
  integer,
} from "@vuelidate/validators";

export function sameAuthorsValidator() {
  if (this.bookSecondAuthor === this.bookFirstAuthor) {
    return false;
  }
  return true;
}

export default {
  name: "BookDetailsView",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      bookTitle: { required },
      bookFirstAuthor: { required },
      bookSecondAuthor: {
        sameAuthorsValidator: {
          $validator: sameAuthorsValidator,
          $message: "Duplicated Author",
        },
      },
      bookGenre: { required },
      bookIsbn: {
        required,
        numeric,
        minLength: minLength(13),
        maxLength: maxLength(13),
      },
      bookPublisher: { required },
      bookTotalPages: { required, integer },
      bookPublishedYear: { required, integer },
    };
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
      this.v$.$validate();

      if (!this.v$.$error) {
        console.log("form validation successful");
        //console.log(this.$state.selectedBook);
      }
    },
  },
  computed: {
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? "Add" : "Edit"} Book`;
    },
    fieldSetTitle() {
      return `${this.isAddMode ? "New book" : "Book: " + this.bookTitle}`;
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
    authorsWithNoneOption: {
      get() {
        // clone array
        var authors = this.$store.state.authors.slice(0);
        var noneOptiion = { id: -1, fullName: "None" };
        // add option at tha beggining
        authors.unshift(noneOptiion);
        return authors;
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
          return -1;
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