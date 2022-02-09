<template>
  <div>
    <Spinner v-if="loading" />
    <div v-else>
      <Header>Šalys</Header>
      <FiltersBar
        @searchFilter="getSearch"
        @dateFrom="getDateFrom"
        @dateTo="getDateTo"
      />
      <FormModal :type="type" @countryAdded="onChange" />
      <AlertInfo v-if="countries.data.length === 0">
        <template slot="info"
          >Šiuo metu nėra pridėtų šalių arba šalių pagal pritaikytus
          filtrus.</template
        >
        <template slot="item">šalį</template>
      </AlertInfo>
      <div v-else>
        <EditModal :type="type" :data="data" @countryUpdated="onChange" />
        <Table
          :type="type"
          :items="countries.data"
          @deleted="managePagesAfterDelete"
          @sort="sortItems(countries)"
          @dataSent="saveData"
        />
        <Pagination :meta="countries.meta" :page="page" @nextPage="getPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import AlertInfo from "../components/AlertInfo";
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
    Spinner,
    Header,
    AlertInfo,
    Table,
    FiltersBar,
    FormModal,
    EditModal,
    Pagination,
  },

  data() {
    return {
      countries: [],
      type: "country",
    };
  },

  methods: {
    onChange() {
      axios
        .get(
          `${baseUrl}/countries?search=${this.search}&start_date=${this.dateFrom}&end_date=${this.dateTo}&page=${this.page}`
        )
        .then((response) => (this.countries = response.data))
        .catch((error) => console.log(error));
    },

    managePagesAfterDelete() {
      if (this.countries.data.length < 2) this.page -= 1;
      this.onChange();
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