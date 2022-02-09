<template>
  <div>
    <form class="row mt-4">
      <div class="col-8">
        <div class="input-group">
          <input
            class="form-control"
            type="search"
            aria-label="Search"
            @input="$emit('searchFilter', $event.target.value)"
          />
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col">
        <input
          class="form-control"
          type="text"
          id="start"
          placeholder="Pasirinkite datą: nuo"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          @input="$emit('dateFrom', $event.target.value)"
        />
      </div>
      <div class="col">
        <input
          class="form-control"
          type="text"
          id="end"
          placeholder="Pasirinkite datą: iki"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          @input="$emit('dateTo', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>