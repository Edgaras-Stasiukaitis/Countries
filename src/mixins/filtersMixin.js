export default {
    data() {
        return {
            loading: true,
            search: "",
            dateFrom: "",
            dateTo: "",
            page: 1,
        }
    },

    methods: {
        getSearch(value) {
            this.page = 1;
            this.search = value;
            this.onChange();
        },

        getDateFrom(value) {
            this.dateFrom = value;
            this.onChange();
        },

        getDateTo(value) {
            this.dateTo = value;
            this.onChange();
        },

        getPage(page) {
            this.page = page;
            this.onChange();
        }
    }
}