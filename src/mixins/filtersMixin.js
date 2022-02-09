export default {
    data() {
        return {
            data: {},
            loading: true,
            sortAsc: false,
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
            this.page = 1;
            this.dateFrom = value;
            this.onChange();
        },

        getDateTo(value) {
            this.page = 1;
            this.dateTo = value;
            this.onChange();
        },

        getPage(page) {
            this.page = page;
            this.onChange();
        },

        saveData(data) {
            this.data = data;
        },

        sortItems(items) {
            this.sortAsc = !this.sortAsc;
            if (this.sortAsc) {
                items.data.sort((a, b) =>
                    a.attributes.name > b.attributes.name
                        ? 1
                        : b.attributes.name > a.attributes.name
                            ? -1
                            : 0
                );
            } else {
                items.data.sort((a, b) =>
                    a.attributes.name < b.attributes.name
                        ? 1
                        : b.attributes.name < a.attributes.name
                            ? -1
                            : 0
                );
            }
        }
    }
}