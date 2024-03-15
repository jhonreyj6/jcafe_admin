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
                            <MenuItem class="py-2 text-sm text-gray-700">
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
                            placeholder="Search for users"
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
                            <th scope="col" class="px-6 py-3">Details</th>
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
                                <p>order items</p>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">0</div>
                            </td>
                            <td class="px-6 py-4">
                                <a
                                    role="button"
                                    class="font-medium text-blue-600"
                                    @click="initEditModal(true, order)"
                                    >Edit
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
                        >Add User</DialogTitle
                    >
                    <DialogDescription>
                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_first_name"
                                    class="leading-7 text-sm text-gray-600"
                                    >First Name</label
                                >
                                <input
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="relative mb-4 w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Last Name</label
                                >
                                <input
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="relative mb-4">
                            <label
                                for="add_email"
                                class="leading-7 text-sm text-gray-600"
                                >Email</label
                            >
                            <input
                                type="email"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_password"
                                    class="leading-7 text-sm text-gray-600"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_confirm_pass"
                                    class="leading-7 text-sm text-gray-600"
                                    >Confirm Password</label
                                >
                                <input
                                    type="password"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="relative mb-4 w-full">
                            <label
                                for="add_contact"
                                class="leading-7 text-sm text-gray-600"
                                >Address</label
                            >
                            <input
                                type="text"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div class="flex flex-row gap-4 mb-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_contact"
                                    class="leading-7 text-sm text-gray-600"
                                    >Contact</label
                                >
                                <input
                                    type="number"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_birthday"
                                    class="leading-7 text-sm text-gray-600"
                                    >Birthday</label
                                >
                                <input
                                    type="date"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="relative mb-4 w-full">
                                <label
                                    for="role"
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >Role</label
                                >
                                <select
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="" selected>
                                        Choose role
                                    </option>
                                    <option value="">Freelancer</option>
                                    <option value="client">Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex flex-row justify-center gap-4">
                            <button
                                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            >
                                Add User
                            </button>
                            <button
                                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogDescription>
                </div>
            </DialogPanel>
        </Dialog>

        <!-- Edit modal -->
        <Dialog
            v-if="form.edit.data"
            :open="modal.edit"
            @close="initEditModal"
            class="z-50 bg-opacity-50 fixed bg-black w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full"
        >
            <DialogPanel
                class="relative w-full max-w-5xl max-h-full justify-center mx-auto mt-24"
            >
                <div class="relative bg-white rounded-lg shadow p-8">
                    <DialogTitle class="text-xl font-bold mb-4 border-b"
                        >Edit User</DialogTitle
                    >
                    <DialogDescription>
                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="first_name"
                                    class="leading-7 text-sm text-gray-600"
                                    >First name</label
                                >
                                <input
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div class="relative mb-4 w-full">
                                <label
                                    for="last_name"
                                    class="leading-7 text-sm text-gray-600"
                                    >Last name</label
                                >
                                <input
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="relative mb-4 w-full">
                            <label
                                for="email"
                                class="leading-7 text-sm text-gray-600"
                                >Email</label
                            >
                            <input
                                type="text"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="password"
                                    class="leading-7 text-sm text-gray-600"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div class="relative mb-4 w-full">
                                <label
                                    for="confirm_pass"
                                    class="leading-7 text-sm text-gray-600"
                                    >Confirm Password</label
                                >
                                <input
                                    type="password"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="relative mb-4">
                            <label
                                for="addr"
                                class="leading-7 text-sm text-gray-600"
                                >Address</label
                            >
                            <input
                                type="text"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div class="flex flex-row gap-4">
                            <div class="relative mb-4 w-full">
                                <label
                                    for="contact"
                                    class="leading-7 text-sm text-gray-600"
                                    >Contact</label
                                >
                                <input
                                    type="number"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div class="relative mb-4 w-full">
                                <label
                                    for="bday"
                                    class="leading-7 text-sm text-gray-600"
                                    >Birthday</label
                                >
                                <input
                                    type="date"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                    </DialogDescription>

                    <div class="flex flex-row-reverse gap-2">
                        <button
                            @click="updateUser"
                            class="inline-flex text-white bg-indigo-700 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Save
                        </button>
                        <button
                            @click="initEditModal(false)"
                            class="inline-flex text-white bg-red-700 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Cancel
                        </button>
                    </div>
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
            },

            form: {
                edit: {
                    data: "",
                },
            },
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

        initEditModal(value, order) {
            this.modal.edit = value;
            this.form.edit.data = order;
        },

        initAddModal(value) {
            this.modal.add = value;
        },
    },

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
        this.getOrders();
    },
};
</script>

<style scoped>
</style>
