<template>
    <div>
        <Aside />

        <div class="pt-20 px-4 ml-16 md:ml-64">
            <div class="grid grid-cols-2 gap-4">
                <div class="border shadow-lg rounded">
                    <div
                        class="p-4 border-b text-center bg-indigo-700 text-white font-bold font-lg"
                    >
                        Users
                    </div>
                    <div class="bg-indigo-50 p-4">
                        <Bar
                            :data="bar.data"
                            :options="bar.options"
                            :style="barStyles"
                        />
                    </div>
                </div>
                <div class="border shadow-lg rounded">
                    <div
                        class="p-4 border-b text-center bg-indigo-700 text-white font-bold font-lg"
                    >
                        Orders
                    </div>
                    <div class="bg-indigo-50 p-4">
                        <Pie
                            :data="pie.data"
                            :options="pie.options"
                            :style="pieStyles"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Aside from "../components/Aside.vue";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { userStore } from "../stores/userStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default {
    data() {
        return {
            bar: {
                data: {
                    // labels: ["Feb", "Mar"],
                    // labels: [this.date.month[new Date().getMonth()]],
                    datasets: [
                        {
                            data: [],
                        },
                    ],
                },
                options: {
                    responsive: true,
                },
            },

            pie: {
                data: {
                    labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                    datasets: [
                        {
                            backgroundColor: [
                                "#41B883",
                                "#E46651",
                                "#00D8FF",
                                "#DD1B16",
                            ],
                            data: [40, 20, 80, 10],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            },
        };
    },
    components: {
        Bar,
        Pie,
        Aside,
    },

    props: {},

    computed: {
        pieStyles() {
            return {
                height: `${440}px`,
                position: "relative",
            };
        },
        barStyles() {
            return {
                height: `${440}px`,
                position: "relative",
            };
        },
    },

    methods: {
        getUsers() {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/api/dashboard`,
                headers: {
                    Authorization: "Bearer ".concat(
                        userStore().authUser.access_token
                    ),
                },
            })
                .then((res) => {
                    //this.bar.data.labels = res.data.months;
                    // this.bar.data.datasets[0].data = res.data.users_count;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },
    },

    // watch: {
    //     $data: {
    //         handler: function (val, oldVal) {
    //             console.log("watcher: ", val);
    //         },
    //         deep: true,
    //     },

    //     $props: {
    //         handler: function (val, oldVal) {
    //             console.log("watcher: ", val);
    //         },
    //         deep: true,
    //     },
    // },

    updated() {},

    created() {
        let month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        this.bar.data.labels = [month[new Date().getMonth()], month[new Date().getMonth() - 1]];
        this.bar.data.datasets = [
            {
                data: [10, 5],
            },
        ];
    },

    mounted() {
        this.getUsers();
    },
};
</script>

<style scoped>
</style>
