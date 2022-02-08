<template>
  <div class="d-flex justify-content-center mt-5 mb-5">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="(page <= 1) ? 'page-item disabled' : 'page-item'">
          <a class="page-link" href="#" aria-label="Previous" @click="nextPage(page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li :class="(page == i) ? 'page-item active' : 'page-item'" v-for="i in getPageCount()" :key="i">
          <a class="page-link" href="#" @click="nextPage(i)">{{ i }}</a>
        </li>
        <li :class="(page >= getPageCount()) ? 'page-item disabled' : 'page-item'">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage(page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["meta", "page"],

  methods: {
    getPageCount() {
      return Math.floor((this.meta.total - 1) / this.meta.per_page + 1);
    },

    nextPage(page) {
      page = page < this.getPageCount() ? 1 : page;
      page = page > this.getPageCount() ? this.getPageCount() : page;
      this.$emit("nextPage", page);
    },
  },
};
</script>