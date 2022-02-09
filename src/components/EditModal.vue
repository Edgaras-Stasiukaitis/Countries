<template>
  <div>
    <b-modal
      id="edit-modal"
      ref="modal"
      :title="type === 'country' ? 'REDAGUOTI ŠALĮ' : 'REDAGUOTI MIESTĄ'"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
      centered
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-input
          id="name-input"
          placeholder="Pavadinimas"
          v-model="name"
          :state="nameState"
          ref="name"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="area-input"
          type="number"
          step="0.01"
          placeholder="Užimamamas plotas"
          v-model="area"
          :state="areaState"
          ref="area"
          required
          trim
        ></b-form-input>
        <br />
        <b-form-input
          id="population-input"
          type="number"
          step="0.01"
          placeholder="Gyventojų skaičius"
          v-model="population"
          :state="populationState"
          ref="population"
          required
          trim
        ></b-form-input>
        <br />
        <b-form-input
          id="code-input"
          :placeholder="
            type === 'country' ? 'Šalies tel. kodas' : 'Miesto pašto kodas'
          "
          v-model="code"
          :state="codeState"
          ref="code"
          required
        ></b-form-input>
        <br />
        <div class="d-flex flex-row-reverse">
          <b-button
            class="mt-2"
            variant="outline-secondary"
            block
            @click="handleOk"
            >SAUGOTI</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { baseUrl } from "../constants";

export default {
  props: ["type", "country", "data"],

  data() {
    return {
      name: "",
      area: 0,
      population: 0,
      code: "",
      nameState: null,
      areaState: null,
      populationState: null,
      codeState: null,
    };
  },

  watch: {
    data() {
      this.name = this.data.attributes.name;
      this.area = this.data.attributes.area;
      this.population = this.data.attributes.population;
      this.code =
        this.type === "country"
          ? this.data.attributes.phone_code
          : this.data.attributes.postal_code;
    },
  },

  methods: {
    checkFormValidity() {
      this.nameState = this.name != "" && /^[A-Za-z\s]*$/.test(this.name);
      this.areaState = this.$refs.area.checkValidity();
      this.populationState = this.$refs.population.checkValidity();
      this.codeState = this.$refs.code.checkValidity();
      return this.nameState && this.areaState && this.populationState && this.codeState
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    resetModal() {
      this.nameState = null;
      this.areaState = null;
      this.populationState = null;
      this.codeState = null;
    },

    handleSubmit() {
      if (!this.checkFormValidity()) return;
      const data = {
        attributes: {
          name: this.name,
          area: this.area,
          population: this.population,
        },
      };
      if (this.type === "country") {
        data.attributes.phone_code = this.code;
        axios
          .put(`${baseUrl}/countries/${this.data.id}`, { data })
          .then((response) => {
            this.$emit(`${this.type}Updated`, response);
            alert("Šalis sėkmingai atnaujinta!");
          })
          .catch((error) => console.log(error));
      } else {
        data.attributes.postal_code = this.code;
        axios
          .put(
            `${baseUrl}/countries/${this.country.id}/cities/${this.data.id}`,
            { data }
          )
          .then((response) => {
            this.$emit(`${this.type}Updated`, response);
            alert("Miestas sėkmingai atnaujintas!");
          })
          .catch((error) => console.log(error));
      }
      this.$nextTick(() => {
        this.$bvModal.hide("edit-modal");
      });
    },
  },
};
</script>

<style>
.close {
  background: none;
  border: none;
  font-size: 25px;
}
</style>