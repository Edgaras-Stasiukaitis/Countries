<template>
  <div>
    <b-modal
      id="form-modal"
      ref="modal"
      :title="(type === 'country') ? 'PRIDĖTI ŠALĮ' : 'PRIDĖTI MIESTĄ'"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-input
          id="name-input"
          placeholder="Pavadinimas"
          v-model="name"
          :state="nameState"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="area-input"
          placeholder="Užimamamas plotas"
          v-model="area"
          :state="areaState"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="population-input"
          placeholder="Gyventojų skaičius"
          v-model="population"
          :state="populationState"
          required
        ></b-form-input>
        <br />
        <b-form-input
          id="code-input"
          :placeholder="(type === 'country') ? 'Šalies tel. kodas' : 'Miesto pašto kodas'"
          v-model="code"
          :state="codeState"
          required
        ></b-form-input>
        <br />
        <b-button
          class="mt-2"
          variant="outline-secondary"
          block
          @click="handleOk"
          >SAUGOTI</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import { baseUrl } from "../constants";

export default {
  props: ["type", "country"],

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
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.areaState = valid;
      this.populationState = valid;
      this.codeState = valid;
      return valid;
    },

    resetModal() {
      this.name = "";
      this.area = "";
      this.population = "";
      this.code = "";
      this.nameState = null;
      this.areaState = null;
      this.populationState = null;
      this.codeState = null;
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      if (!this.checkFormValidity()) return;
      if (this.type === "country") {
        const data = {
          attributes: {
            name: this.name,
            area: this.area,
            population: this.population,
            phone_code: this.code,
          },
        };
        axios
          .post(`${baseUrl}/countries`, { data })
          .then((_) => alert("Šalis sėkmingai pridėta!"))
          .catch((error) => console.log(error));
      } else {
        const data = {
          attributes: {
            name: this.name,
            area: this.area,
            population: this.population,
            postal_code: this.code,
          },
        };
        axios
          .post(`${baseUrl}/countries/${this.country.id}/cities`, { data })
          .then((_) => alert("Miestas sėkmingai pridėtas!"))
          .catch((error) => console.log(error));
      }
      this.$emit(`${this.type}Added`, { data });

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>