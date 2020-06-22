<template>
    <div class="wrapper">
        <div class="table-responsive"
            v-if="! processing || hasLines">
            <table class="table is-striped is-marginless is-narrow split-table"
                v-if="hasLines">
                <header-line v-bind="$attrs"/>
                <transition-group name="lines"
                    tag="tbody">
                    <tr is="row-line"
                        v-for="(line,index) in lines"
                        :key="`line-${index}`"
                        class="line"
                        :line="line"
                        :index="index"
                        :balance="balance"
                        :processing="processing"
                        :errors="errors"
                        :params="params"
                        v-on="$listeners"
                        @remove="removeLine(index)"/>
                </transition-group>
                <footer-line :balance="balance"
                    :processing="processing"
                    @add-line="addLine"
                    @save="save">
                    <template v-slot:actions-left>
                        <slot name="actions-left"/>
                    </template>
                </footer-line>
            </table>
            <no-lines v-on="$listeners"
                :processing="processing"
                @add-line="addLine"
                v-else>
                <template v-slot:actions-left>
                    <slot name="actions-left"/>
                </template>
            </no-lines>
        </div>
        <div class="has-text-centered"
            v-else>
            <span class="icon">
                <fa icon="spinner"
                    spin/>
            </span>
        </div>
    </div>
</template>

<script>
import Errors from '@enso-ui/laravel-validation';
import HeaderLine from './HeaderLine.vue';
import RowLine from './RowLine.vue';
import FooterLine from './FooterLine.vue';
import NoLines from './NoLines.vue';

export default {
    name: 'Splits',

    components: {
        HeaderLine, RowLine, FooterLine, NoLines,
    },

    inject: ['route', 'errorHandler'],

    props: {
        id: {
            type: Number,
            default: null,
        },
        ids: {
            type: Array,
            default: () => null,
        },
        type: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        errors: new Errors(),
        lines: [],
        processing: true,
    }),

    computed: {
        balance() {
            return this.lines.reduce((sum, split) => sum + split.percent, 0) - 100;
        },
        params() {
            return {
                splittable_ids: this.id ? [this.id] : this.ids,
                splittable_type: this.type,
            };
        },
        hasLines() {
            return this.lines.length > 0;
        },
    },

    created() {
        this.load();
    },

    methods: {
        request(request) {
            this.processing = true;

            request().then((result) => {
                this.processing = false;
                return result;
            }).catch((error) => this.handleError(error));
        },
        save() {
            const request = () => axios.post(this.route('projects.splits.store'), {
                ...this.params,
                splits: this.lines,
            }).then(({ data }) => {
                this.$toastr.success(data.message);
                this.$emit('save');
            });

            this.request(request);
        },
        load() {
            const request = () => axios.get(this.route('projects.splits.index'), {
                params: this.params,
            }).then(({ data }) => {
                this.lines = data;
            });

            this.request(request);
        },
        addLine() {
            this.lines.push({
                project_id: null,
                percent: 0,
            });
        },
        removeLine(index) {
            this.lines.splice(index, 1);

            if (this.lines.length === 0) {
                this.save();
            }
        },
        handleError(error) {
            this.processing = false;

            const { status, data } = error.response;
            if (status === 422) {
                this.errors.set(data.errors);
                return;
            }
            this.errorHandler(error);
        },
        resetErrors() {
            this.errors = new Errors();
        },
    },
};
</script>

<style lang="scss">
    .split-table {
        width: 650px;

        th {
            vertical-align: middle;
        }

        .line {
            transition: all 0.5s;
        }

        .lines-move {
            transition: item transform 0.333s;
        }

        .lines-enter, .lines-leave-to {
            opacity: 0;
        }
    }
</style>
