<template>
  <div>
    <div class="center mt-5" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <div class="parent">
        <div class="child inline-block-child text-uppercase">
          <label class="title">Šalys</label>
        </div>
        <div class="child inline-block-child mt-2">
          <b-button
            variant="outline-primary"
            class="btn-circle"
            v-b-modal.form-modal
            ><i class="fas fa-plus fa-2x"></i
          ></b-button>
        </div>
      </div>
      <FiltersBar
        @searchFilter="getSearch"
        @dateFrom="getDateFrom"
        @dateTo="getDateTo"
        ></FiltersBar
      >
      <FormModal :type="type" @countryAdded="addCountry"></FormModal>
      <EditModal></EditModal>
      <Table :type="type" :items="countries.data" />
      <Pagination :meta="countries.meta" :page="page" @nextPage="getPage" />
    </div>
  </div>
</template>

<script>
import Table from "../components/Table";
import FiltersBar from "../components/FiltersBar";
import Pagination from "../components/Pagination";
import FormModal from "../components/FormModal";
import EditModal from "../components/EditModal";
import { baseUrl } from "../constants";
import filtersMixin from "../mixins/filtersMixin";

export default {
  mixins: [filtersMixin],

  components: {
    Table,
    FiltersBar,
    FormModal,
    EditModal,
    Pagination
  },

  data() {
    return {
      countries: [],
      type: "country",
    };
  },

  methods: {
    addCountry(country) {
      this.countries.unshift(country);
    },

    onChange() {
      axios
        .get(
          `${baseUrl}/countries?search=${this.search}&start_date=${this.dateFrom}&end_date=${this.dateTo}&page=${this.page}`
        )
        .then((response) => (this.countries = response.data));
    },
  },

  created() {
    axios
      .get(`${baseUrl}/countries?page=${this.page}`)
      .then((response) => (this.countries = response.data))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>