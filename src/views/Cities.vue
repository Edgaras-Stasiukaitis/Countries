<template>
  <div>
    <Spinner v-if="loading" />
    <div v-else>
      <div v-if="notFound">
        <div class="alert alert-info mt-3" role="alert">
          <h4 class="alert-heading">Pasirinkta šalis neegzistuoja!</h4>
        </div>
      </div>
      <div v-else>
        <Header>{{ country.attributes.name }}</Header>
        <FiltersBar
          @searchFilter="getSearch"
          @dateFrom="getDateFrom"
          @dateTo="getDateTo"
        />
        <FormModal :type="type" :country="country" @cityAdded="onChange" />
        <AlertInfo v-if="cities.data.length === 0">
          <template slot="info"
            >Šiuo metu šalyje nėra pridėtų miestų arba miestų pagal pritaikytus
            filtrus.</template
          >
          <template slot="item">miestą</template>
        </AlertInfo>
        <div v-else>
          <EditModal
            :type="type"
            :country="country"
            :data="data"
            @cityUpdated="onChange"
          />
          <Table
            :type="type"
            :items="cities.data"
            @deleted="managePagesAfterDelete"
            @sort="sortItems(cities)"
            @dataSent="saveData"
          />
          <Pagination :meta="cities.meta" :page="page" @nextPage="getPage" />
        </div>
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
    Pagination,
    FormModal,
    EditModal,
  },

  data() {
    return {
      cities: [],
      type: "city",
      country: {},
      notFound: false,
    };
  },

  methods: {
    onChange() {
      axios
        .get(
          `${baseUrl}/countries/${this.$route.query.id}/cities?search=${this.search}&start_date=${this.dateFrom}&end_date=${this.dateTo}&page=${this.page}`
        )
        .then((response) => (this.cities = response.data))
        .catch((error) => console.log(error));
    },

    getCountry() {
      axios
        .get(`${baseUrl}/countries/${this.$route.query.id}`)
        .then((response) => (this.country = response.data.data))
        .catch((error) => {
          this.notFound = true;
          console.log(error);
        });
    },

    managePagesAfterDelete() {
      if (this.cities.data.length < 2) this.page -= 1;
      this.onChange();
    }
  },

  created() {
    if(this.$route.query.id == null) {
      this.$router.push({
        name: "countries"
      });
      return;
    }
    this.getCountry();
    if (this.notFound) return;
    axios
      .get(
        `${baseUrl}/countries/${this.$route.query.id}/cities?page=${this.page}`
      )
      .then((response) => (this.cities = response.data))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
};
</script>