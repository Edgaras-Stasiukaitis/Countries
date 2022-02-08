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
          <label class="title">{{ country.attributes.name }}</label>
        </div>
        <div class="child inline-block-child mt-2">
          <b-button
            variant="outline-primary"
            class="btn-circle"
            v-b-modal.edit-modal
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
      <FormModal :type="type" :country="country" @cityAdded="addCity"></FormModal>
      <EditModal></EditModal>
      <Table :type="type" :items="cities.data"></Table>
      <Pagination :meta="cities.meta" :page="page" @nextPage="getPage" />
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
    Pagination,
    FormModal,
    EditModal
  },

  props: ["country"],

  data() {
    return {
      cities: [],
      type: "city",
    };
  },

  methods: {
    addCity(city) {
      this.cities.unshift(city);
    },

    onChange() {
      axios
        .get(
          `${baseUrl}/countries/${this.country.id}/cities?search=${this.search}&start_date=${this.dateFrom}&end_date=${this.dateTo}&page=${this.page}`
        )
        .then((response) => (this.cities = response.data));
    },
  },

  created() {
    axios
      .get(`${baseUrl}/countries/${this.country.id}/cities?page=${this.page}`)
      .then((response) => (this.cities = response.data))
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