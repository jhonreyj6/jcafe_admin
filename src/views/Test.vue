<template>
    <div></div>
</template>
<script>
import { onMounted, reactive, toRefs, computed, defineComponent } from "vue";

export default defineComponent({
    props: [],

    components: {},

    setup(props, context) {
        const data = reactive({
            some_data: "",
        });

        function myFunction() {}

        const currentUser = computed(() => {});

        onMounted(() => {});

        return {
            myFunction,
            currentUser,
            ...toRefs(data),
        };
    },
});
</script>

<style scoped>
</style>