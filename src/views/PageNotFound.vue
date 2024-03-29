<template>
    <div class="mt-40">
        <div class="max-w-5xl mx-auto">
            <div class="text-center">
                <h1 class="font-bold text-3xl">404</h1>
                <p class="text-2xl mb-2">
                    <span class="text-red-500">Opps!</span> Page not found.
                </p>
                <p class="text-xl mb-6">The page you’re looking for doesn’t exist.</p>
                <a role="button" class="hover:bg-blue-700 rounded-lg border px-4 py-2 text-xl bg-blue-500 text-white" @click="$router.push('/dashboard')">Go Back</a>
            </div>
        </div>
    </div>
</template>
<script>
//import name from './

export default {
    data() {
        return {};
    },
    components: {},

    props: [],

    computed: {},

    methods: {},

    // watch: {
    //     $data: {
    //         handler: function(val, oldVal) {
    //             console.log('watcher: ',val);
    //         },
    //         deep: true
    //     }
    // },

    updated() {},

    mounted() {},
};
</script>

<style scoped>
</style>
