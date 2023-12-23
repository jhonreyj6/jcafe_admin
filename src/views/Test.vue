<template>
    <div class="space-intro">Test</div>
</template>
<script>
export default {
    data() {
        return {};
    },
    components: {},

    props: {},

    computed: {},

    methods: {},

    watch: {
        $data: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },

        $props: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },
        some_prop: function () {
            //do something if some_prop updated
        },
    },

    updated() {},

    beforeMounted() {},

    mounted() {
        window.Echo.channel("test").listen(
            ".test.event",
            (e) => {
                console.log(e);
                console.log("load new message");
            }
        );
    },
};
</script>

<style scoped>
.space-intro {
    margin: 100px 30px;
}
</style>