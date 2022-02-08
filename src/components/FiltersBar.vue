<template>
  <div>
    <form class="d-flex mt-4">
      <input class="form-control" type="search" aria-label="Search" @input="searchName">
      <button type="button" class="btn me-2">
        <i class="fas fa-search"></i>
      </button>
      <input class="form-control me-2" type="date" id="start" @input="dateFrom"/>
      <input class="form-control" type="date" id="end" @input="dateTo"/>
    </form>
  </div>
</template>

<script>
export default {
    methods: {
        searchName(event) {
            this.$emit('searchFilter', event.target.value);
        },

        dateFrom(event) {
            this.$emit('dateFrom', event.target.value);
        },

        dateTo(event) {
            this.$emit('dateTo', event.target.value);
        }
    }
}
</script>

<style>
.title {
  font-size: 70px;
}

.parent {
  padding-right: 5px;
  display: flex;
  align-items: center;
}
.child {
  padding-right: 25px;
}

.inline-block-child {
  display: inline-block;
}

.btn-circle {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
</style>