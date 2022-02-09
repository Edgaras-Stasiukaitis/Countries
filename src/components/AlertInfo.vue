<template>
  <div class="alert alert-info mt-3" role="alert">
    <slot name="info"></slot>
    <button class="btn btn-sm btn-primary" v-b-modal.form-modal>
      <i class="fas fa-plus"></i>
      Pridėkite
    </button>
    naują <slot name="item"></slot>.
  </div>
</template>