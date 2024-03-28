<template>
    <div>
        <Aside />

        <div class="pt-20 ml-16 md:ml-64 px-4">
            <div
                class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 border"
            >
                <div class="flex items-center justify-between pb-4 bg-white">
                    <Menu>
                        <MenuButton
                            class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                            >Action</MenuButton
                        >
                        <MenuItems
                            class="z-10 bg-white absolute mt-32 divide-y divide-gray-100 shadow w-56"
                        >
                            <MenuItem>
                                <a
                                    class="block px-4 py-2 cursor-pointer hover:bg-indigo-50"
                                    role="button"
                                    @click="modal.add = true"
                                >
                                    Add Order
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    role="button"
                                    class="block px-4 py-2 cursor-pointer hover:bg-indigo-50"
                                    @click="modal.delete = true"
                                    >Delete Order</a
                                >
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                    <div class="relative">
                        <div
                            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                        >
                            <svg
                                class="w-5 h-5 text-gray-500"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search order"
                            @keyup.prevent="searchOrder"
                            ref="search"
                        />
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500 mb-4">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input
                                        ref="checkbox_all"
                                        @change="selectAll($event)"
                                        id="checkbox_id"
                                        type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label for="checkbox_id" class="sr-only"
                                        >checkbox</label
                                    >
                                </div>
                            </th>
                            <th scope="col" class="px-2 py-3">ID</th>
                            <th scope="col" class="px-6 py-3">User</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="bg-white border-b items-center"
                            v-for="order in orders.data"
                            :key="order.id"
                        >
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input
                                        :id="order.id"
                                        type="checkbox"
                                        v-model="selected_orders"
                                        :value="order.id"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label :for="order.id" class="sr-only"
                                        >checkbox</label
                                    >
                                </div>
                            </td>
                            <td class="px-2 py-4">
                                <div class="text-base text-dark font-semibold">
                                    {{ order.id }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">Yer Nohj</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    {{ order.status }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a
                                    role="button"
                                    class="font-medium text-blue-600"
                                    >View Details
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination :data="orders" />
            </div>
        </div>

        <!-- Add modal -->
        <Dialog
            :open="modal.add"
            @close="initAddModal"
            class="z-50 bg-opacity-50 fixed bg-black w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full"
        >
            <DialogPanel
                class="relative w-full max-w-5xl max-h-full justify-center mx-auto mt-24"
            >
                <div class="relative bg-white rounded-lg shadow p-8">
                    <DialogTitle class="text-xl font-bold mb-4 border-b"
                        >Add Order</DialogTitle
                    >
                    <DialogDescription>
                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_first_name"
                                    class="leading-7 text-sm text-gray-600"
                                    >User ID</label
                                >
                                <input
                                    type="number"
                                    id="add_first_name"
                                    v-model="form.add.user_id"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div
                            class="flex flex-row gap-4 mb-4"
                            v-for="count in variant_counts"
                            :key="count"
                        >
                            <div class="relative w-full">
                                <label
                                    :for="`variant_${count}`"
                                    class="leading-7 text-sm text-gray-600"
                                    >Product Variant ID</label
                                >
                                <input
                                    type="number"
                                    :id="`variant_${count}`"
                                    class="variant_id_class w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div class="relative w-full">
                                <label
                                    :for="`variant_quantity_${count}`"
                                    class="leading-7 text-sm text-gray-600"
                                    >Quantity</label
                                >
                                <input
                                    type="number"
                                    :id="`variant_quantity_${count}`"
                                    class="quantity_id_class w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <button
                                @click="variant_counts++"
                                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            >
                                Add Variant
                            </button>
                        </div>

                        <div class="flex flex-row justify-center gap-4">
                            <button
                                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                @click="createOrder"
                            >
                                Create
                            </button>
                            <button
                                class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-indiredgo-600 rounded text-lg"
                                @click="modal.add = false"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogDescription>
                </div>
            </DialogPanel>
        </Dialog>

        <!-- delete modal -->
        <Dialog
            :open="modal.delete"
            @close="setDeleteOrderModal"
            class="z-50 bg-opacity-50 fixed bg-black w-full overflow-x-hidden overflow-y-auto inset-0 max-h-full"
        >
            <DialogPanel
                class="relative w-full max-w-5xl max-h-full justify-center mx-auto mt-24"
            >
                <div class="relative bg-white rounded-lg shadow p-8">
                    <DialogDescription>
                        <div class="flex flex-col gap-4 p-4 items-center">
                            <div class="text-5xl text-red-700 mb-4">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </div>

                            <div class="text-3xl">Are you Sure?</div>

                            <div class="mb-4">
                                Do you really want to delete this product?
                            </div>

                            <div class="flex flex-row gap-4">
                                <button
                                    class="text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                    type="button"
                                    @click="deleteOrder"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    class="text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                                    @click="modal.delete = false"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </DialogDescription>
                </div>
            </DialogPanel>
        </Dialog>
    </div>
</template>
<script>
import Aside from "../components/Aside.vue";
import { userStore } from "../stores/userStore";
import Pagination from "../components/Pagination.vue";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
} from "@headlessui/vue";

export default {
    data() {
        return {
            orders: "",
            selected_orders: [],
            modal: {
                add: false,
                edit: false,
                delete: false,
            },

            form: {
                add: {
                    user_id: "",
                },
            },
            variant_counts: 1,
        };
    },
    components: {
        Aside,
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Pagination,
    },

    props: {},

    computed: {},

    methods: {
        
        
        searchOrder(e) {
            if(e.keyCode == 13) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: 'get',
                params: {query: this.$refs.search.value},
                url: `/api/orders/admin/search`,
                headers: {Authorization: AuthStr}
            }).then(res => {
                this.orders = res.data;
            }).catch(err => {
            
            });  
        }
        },
        
        createOrder(e) {
            e.target.disabled = true;
            let product_variant_ids = Array.from(document.getElementsByClassName('variant_id_class'));
            let product_variant_quantity = Array.from(document.getElementsByClassName('quantity_id_class'));
            
            let ids = [];
            let quantities = [];
            let error = false;

            product_variant_ids.forEach(element => {
                if(element.value) {
                ids.push(element.value)
                } else {
                    error = true;
                }
            });
            
            product_variant_quantity.forEach(element => {
                if(element.value) {
                    quantities.push(element.value);
                } else {
                    error = true;
                }
            });
            if(error) {
                return false;
            }
            
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: 'POST',
                params: {
                    user_id: this.form.add.user_id,
                    quantity: quantities,
                    variant_id: ids,
                },
                url: `/api/orders/admin`,
                headers: {Authorization: AuthStr}
            }).then(res => {
                this.modal.add = false;
                e.target.disabled = false;
            }).catch(err => {
                e.target.disabled = false;
            });
        },
        
        setDeleteOrderModal(condition) {
            this.modal.delete = condition;
        },
        
        deleteOrder() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "delete",
                params: { id: this.selected_orders },
                url: `/api/orders/admin`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.orders.data = this.orders.data.filter((order) => {
                        return !this.selected_orders.includes(order.id);
                    });

                    this.selected_users = [];
                    this.modal.delete = false;
                })
                .catch((err) => {});
        },

        selectAll(e) {
            if (e.target.checked) {
                this.orders.data.forEach((order) => {
                    if (!this.selected_orders.includes(order.id)) {
                        this.selected_orders.push(order.id);
                    }
                });
            } else {
                this.selected_orders = [];
            }
        },

        getOrders() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: `/api/orders`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.orders = res.data;
                })
                .catch((err) => {});
        },

        initAddModal(value) {
            this.modal.add = value;
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
    //     some_prop: function () {
    //         //do something if some_prop updated
    //     },
    // },

    updated() {},

    beforeMounted() {},

    mounted() {
        this.getOrders();
    },
};
</script>

<style scoped>
</style>
