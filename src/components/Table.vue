<template>
  <table class="table table-bordered table-hover mt-3">
    <thead>
      <tr class="text-uppercase">
        <th scope="col" @click="$emit('sort')">
          Pavadinimas<a class="action" href="javascript:void(0)"
            ><i class="fa fa-fw fa-sort"></i
          ></a>
        </th>
        <th scope="col">Užimamamas plotas</th>
        <th scope="col">Gyventojų skaičius</th>
        <th scope="col" v-if="type === 'country'">Šalies tel. kodas</th>
        <th scope="col" v-else>Miesto pašto kodas</th>
        <th scope="col">Veiksmai</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-if="type === 'country'">
          <a
            class="remove-underline"
            href="javascript:void(0)"
            @click="redirect(item)"
            >{{ item.attributes.name }}</a
          >
        </td>
        <td v-else>{{ item.attributes.name }}</td>
        <td>{{ item.attributes.area }}</td>
        <td>{{ item.attributes.population }}</td>
        <td v-if="type === 'country'">
          {{ item.attributes.phone_code }}
        </td>
        <td v-else>{{ item.attributes.postal_code }}</td>
        <td>
          <div class="d-flex justify-content-center hstack gap-3">
            <a
              class="action"
              href="javascript:void(0)"
              @click="deleteItem(item)"
              ><i class="bi bi-trash fa-lg"></i
            ></a>
            <div class="vr"></div>
            <a
              class="action"
              href="javascript:void(0)"
              v-b-modal.edit-modal
              @click="$emit('dataSent', item)"
              ><i class="bi bi-pen fa-lg"></i
            ></a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { baseUrl } from "../constants";

export default {
  props: ["type", "items"],

  methods: {
    deleteItem(item) {
      if (window.confirm(`Ar tikrai norite pašalinti ${item.attributes.name}?`))
        axios
          .delete(
            item.type === "countries"
              ? `${baseUrl}/countries/${item.id}`
              : `${baseUrl}/countries/${item.relationships.country.data.id}/cities/${item.id}`
          )
          .then((response) => this.$emit("deleted", response))
          .catch((error) => console.log(error));
    },

    redirect(country) {
      this.$router.push({
        name: "cities",
        query: {
          id: country.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.remove-underline {
  text-decoration: none;
}

.action:link {
  color: gray;
}

.action:visited {
  color: gray;
}

.action:hover {
  color: rgb(0, 110, 255);
}

.action:active {
  color: rgb(0, 110, 255);
}
</style>