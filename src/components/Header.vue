<template>
  <div class="parent">
    <div class="child inline-block-child text-uppercase">
      <label class="title"><slot></slot></label>
    </div>
    <div class="child inline-block-child mt-2">
      <button class="btn btn-outline-primary btn-circle" v-b-modal.form-modal>
        <i class="fas fa-plus fa-2x"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 65px;
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
</style>