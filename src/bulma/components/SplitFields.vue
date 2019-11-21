<script>

export default {
    name: 'SplitFields',

    props: {
        form: {
            type: Object,
            required: true,
        },
        fieldSource: {
            type: String,
            required: true,
        },
        splitAttributes: {
            type: String,
            default: 'splitAttributes',
        },
        section: {
            type: Number,
            required: true,
        },
        pivotKey: {
            type: String,
            required: true,
        },
        pivotName: {
            type: String,
            default: 'name',
        },
        whole: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            template: null,
            isDirty: false,
        };
    },

    computed: {
        fields() {
            return this.form.data.sections[this.section].fields;
        },
        requiredFields() {
            const fieldSource = this.form.field(this.fieldSource);

            return fieldSource.meta.options
                .filter(option => fieldSource.value.includes(option.id))
                .map((option) => {
                    const item = {};
                    item[this.pivotKey] = option.id;
                    item[this.pivotName] = option[this.pivotName];
                    return item;
                });
        },
        originalValues() {
            return this.form.data.params
                ? this.form.data.params[this.splitAttributes]
                : [];
        },
        total() {
            return this.fields.reduce((total, field) => (total += field.value), 0);
        },
    },

    watch: {
        requiredFields: {
            handler(newVal, oldVal) {
                this.isDirty = true;

                if (newVal.length !== oldVal.length) {
                    this.removeExtraFields()
                        .addMissingFields();
                }
            },
        },
    },

    created() {
        this.setTemplate();
        this.addMissingFields();
    },

    methods: {
        removeExtraFields() {
            this.fields.forEach((field, index) => {
                if (this.isExtra(field)) {
                    this.fields.splice(index, 1);
                }
            });

            this.updateVisibility();

            return this;
        },
        isExtra(field) {
            return this.requiredFields
                .findIndex(requiredFied => requiredFied[this.pivotKey]
                    === field.meta[this.pivotKey]) === -1;
        },
        addMissingFields() {
            this.requiredFields.forEach((field, index) => {
                if (this.isMissing(field)) {
                    this.fields.splice(index, 0, this.fieldFactory(field));
                }
            });

            this.updateVisibility();

            return this;
        },
        isMissing(field) {
            return this.fields.findIndex(
                ({ meta }) => meta[this.pivotKey] === field[this.pivotKey],
            ) === -1;
        },
        updateVisibility() {
            if (!this.whole) {
                return;
            }

            const isSingle = this.fields.length === 1;
            this.fields.forEach(field => (field.meta.hidden = isSingle));

            if (isSingle) {
                this.fields[0].value = 100;
            }
        },
        fieldFactory(item) {
            const field = JSON.parse(JSON.stringify(this.template));

            field.name = this.pivotKey.replace(/id$/, item[this.pivotKey]);
            field.label = item[this.pivotName];
            field.value = this.originalValue(item[this.pivotKey]);
            field.meta[this.pivotKey] = item[this.pivotKey];
            field.meta.hidden = this.whole && !this.fields.length;

            return field;
        },
        originalValue(itemId) {
            const current = this.originalValues
                .find(item => item[this.pivotKey] === itemId);

            return current ? current.value : this.valueFactory();
        },
        valueFactory() {
            return this.whole
                ? 100 - this.total
                : 0;
        },
        setTemplate() {
            this.template = this.fields.pop();
        },
    },

    render() { return null; },
};

</script>
