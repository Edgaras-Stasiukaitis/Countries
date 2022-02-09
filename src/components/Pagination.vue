<template>
  <div class="d-flex justify-content-center mt-5 mb-5">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="(page <= 1) ? 'page-item disabled' : 'page-item'">
          <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextPage(page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li :class="(page == i) ? 'page-item active' : 'page-item'" v-for="i in meta.last_page" :key="i">
          <a class="page-link" href="javascript:void(0)" @click="nextPage(i)">{{ i }}</a>
        </li>
        <li :class="(page >= meta.last_page) ? 'page-item disabled' : 'page-item'">
          <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextPage(page + 1)">
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
    nextPage(page) {
      this.$emit("nextPage", page);
    },
  },
};
</script>