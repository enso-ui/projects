<template>
    <div class="wrapper">
        <div class="table-responsive"
            v-if="! processing || hasLines">
            <table class="table is-striped is-marginless is-narrow project-table"
                v-if="hasLines">
                <header-line v-bind="$attrs"/>
                <transition-group name="lines"
                    tag="tbody">
                    <tr is="row-line"
                        v-for="(line,index) in lines"
                        :key="index"
                        class="line"
                        :line="line"
                        :index="index"
                        :balance="balance"
                        :errors="errors"
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
import Errors from '@enso-ui/forms/src/classes/Errors';
import HeaderLine from './HeaderLine.vue';
import RowLine from './RowLine.vue';
import FooterLine from './FooterLine.vue';
import NoLines from './NoLines.vue';

export default {
    name: 'Projects',

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
            return this.lines.reduce((sum, project) => sum + project.amount, 0) - 100;
        },
        params() {
            return {
                projectable_ids: this.id ? [this.id] : this.ids,
                projectable_type: this.type,
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
        chainRequest(call) {
            const processing = () => {
                this.processing = true;
                call().then((result) => {
                    this.processing = false;
                    return result;
                }).catch((error) => this.handleError(error));
            };

            this.promise = this.promise
                ? this.promise.then(processing)
                : processing();
        },
        save() {
            const call = () => axios.post(this.route('projects.financials.store'), {
                ...this.params,
                projects: this.lines,
            }).then(({ data }) => {
                this.$toastr.success(data.message);
                this.$emit('save');
            });

            this.chainRequest(call);
        },
        load() {
            const call = () => axios.get(this.route('projects.financials.index'), {
                params: this.params,
            }).then(({ data }) => {
                this.lines = data;
            });

            this.chainRequest(call);
        },
        addLine() {
            this.lines.push({
                project_id: null,
                amount: 0,
            });
        },
        removeLine(index) {
            this.lines.splice(index, 1);
            this.save();
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
    .project-table {
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
