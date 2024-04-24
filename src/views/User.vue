<template>
    <div>
        <Aside />

        <div class="pt-20 px-4 ml-16 md:ml-64">
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
                                    Add User
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    role="button"
                                    class="block px-4 py-2 cursor-pointer hover:bg-indigo-50"
                                    @click="modal.delete = true"
                                    >Delete User</a
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
                            @keyup="searchUser"
                            v-model="form.search"
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
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Details</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="bg-white border-b items-center"
                            v-for="user in users.data"
                            :key="user.id"
                        >
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input
                                        :id="user.id"
                                        type="checkbox"
                                        v-model="selected_users"
                                        :value="user.id"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label :for="user.id" class="sr-only"
                                        >checkbox</label
                                    >
                                </div>
                            </td>
                            <td class="px-2 py-4">
                                <div class="text-base text-dark font-semibold">
                                    {{ user.id }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-base text-dark font-semibold">
                                    {{ user.first_name }} {{ user.last_name }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <p>Role: {{ user.role }}</p>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div
                                        class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"
                                    ></div>
                                    Online
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a
                                    role="button"
                                    class="font-medium text-blue-600"
                                    @click="initEditModal(true, user)"
                                    >Edit
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination :data="users" />
            </div>
        </div>

        <!-- edit modal -->
        <Dialog
            v-if="edit_user"
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
                                    id="first_name"
                                    v-model="form.updateUser.first_name"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    :placeholder="edit_user.first_name"
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
                                    id="last_name"
                                    v-model="form.updateUser.last_name"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    :placeholder="edit_user.last_name"
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
                                type="email"
                                id="email"
                                v-model="form.updateUser.email"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                :placeholder="edit_user.email"
                                autocomplete="off"
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
                                    id="password"
                                    v-model="form.updateUser.password"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    autocomplete="off"
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
                                    id="confirm_pass"
                                    v-model="form.updateUser.confirm_password"
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
                                id="addr"
                                v-model="form.updateUser.address"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                :placeholder="edit_user.address"
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
                                    id="contact"
                                    v-model="form.updateUser.contact"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    :placeholder="edit_user.contact"
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
                                    id="bday"
                                    v-model="form.updateUser.birthday"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    :placeholder="edit_user.birthday"
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

        <!-- add modal -->
        <Dialog
            :open="modal.add"
            @close="initAddModal(false)"
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
                                    v-model="form.addUser.first_name"
                                    type="text"
                                    id="add_first_name"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="relative mb-4 w-full">
                                <label
                                    for="add_last_name"
                                    class="leading-7 text-sm text-gray-600"
                                    >Last Name</label
                                >
                                <input
                                    type="text"
                                    v-model="form.addUser.last_name"
                                    id="add_last_name"
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
                                v-model="form.addUser.email"
                                id="add_email"
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
                                    v-model="form.addUser.password"
                                    id="add_password"
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
                                    v-model="form.addUser.confirm_password"
                                    id="add_confirm_pass"
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
                                id="add_address"
                                v-model="form.addUser.address"
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
                                    id="add_contact"
                                    v-model="form.addUser.contact"
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
                                    v-model="form.addUser.birthday"
                                    id="add_birthday"
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
                                    id="role"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    v-model="form.addUser.role"
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
                                @click="createUser"
                            >
                                Add User
                            </button>
                            <button
                                class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
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
            @close="initDeleteModal"
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
                                    @click="deleteUser"
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
import { onMounted, ref, toRefs, watch, defineComponent } from "vue";

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
import { reactive } from "vue";

export default defineComponent({
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

    methods: {},

    setup() {
        const data = reactive({
            users: "",
            edit_user: "",
            selected_users: [],
            form: {
                addUser: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    contact: "",
                    address: "",
                    birthday: "",
                    role: "",
                },
                updateUser: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    contact: "",
                    address: "",
                    birthday: "",
                },
                search: "",
            },
            modal: {
                add: false,
                edit: false,
                delete: false,
            },
        });

        function getAllUsers() {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/api/users`,
                headers: {
                    Authorization: `Bearer`.concat(
                        userStore().user.access_token
                    ),
                },
            })
                .then((res) => {
                    data.users = res.data;
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }

        function prevPage(url) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.users = res.data;
                })
                .catch((err) => {});
        }

        function selectAll(e) {
            if (e.target.checked) {
                data.users.data.forEach((user) => {
                    if (!data.selected_users.includes(user.id)) {
                        data.selected_users.push(user.id);
                    }
                });
            } else {
                data.selected_users = [];
            }
        }

        function nextPage(url) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.users = res.data;
                })
                .catch((err) => {});
        }

        function prevPage(url) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.users = res.data;
                })
                .catch((err) => {});
        }

        function goToPage(url, page) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: `${url}?page=${page}`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.users = res.data;
                })
                .catch((err) => {});
        }

        function initAddModal(value) {
            data.modal.add = value;
        }

        function initDeleteModal(value) {
            data.modal.delete = value;
        }

        function initEditModal(value, user) {
            data.modal.edit = value;
            data.edit_user = user;
        }

        function createUser(e) {
            e.target.disabled = true;
            axios({
                method: "post",
                url: `/api/users`,
                params: {
                    first_name: data.form.addUser.first_name,
                    last_name: data.form.addUser.last_name,
                    email: data.form.addUser.email,
                    password: data.form.addUser.password,
                    confirm_password: data.form.addUser.confirm_password,
                    contact: data.form.addUser.contact,
                    address: data.form.addUser.address,
                    birthday: data.form.addUser.birthday,
                    role: data.form.addUser.role,
                },
                headers: {
                    Authorization: `Bearer`.concat(
                        userStore().user.access_token
                    ),
                },
            })
                .then((res) => {
                    data.users.data.unshift(res.data);
                    data.modal.add = false;
                    e.target.disabled = false;
                })
                .catch((err) => {
                    e.target.disabled = false;
                    console.log(err.response);
                });
        }

        function searchUser(e) {
            if (e.keyCode == 13) {
                if (data.form.search == null) {
                    getAllUsers();
                } else {
                    const AuthStr = "Bearer ".concat(
                        userStore().user.access_token
                    );
                    axios({
                        method: "get",
                        params: { query: data.form.search },
                        url: `/api/users/search`,
                        headers: { Authorization: AuthStr },
                    })
                        .then((res) => {
                            data.users = res.data;
                        })
                        .catch((err) => {});
                }
            }
        }

        function deleteUser() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "delete",
                params: { id: data.selected_users },
                url: `/api/users`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    data.users.data = data.users.data.filter((user) => {
                        return !data.selected_users.includes(user.id);
                    });

                    data.selected_users = [];
                    data.modal.delete = false;
                })
                .catch((err) => {});
        }

        function updateUser() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "patch",
                url: `/api/users/${data.edit_user.id}`,
                params: {
                    first_name: data.form.updateUser.first_name
                        ? data.form.updateUser.first_name
                        : data.edit_user.first_name,
                    last_name: data.form.updateUser.last_name
                        ? data.form.updateUser.last_name
                        : data.edit_user.last_name,
                    email: data.form.updateUser.email
                        ? data.form.updateUser.email
                        : data.edit_user.email,
                    password: data.form.updateUser.password
                        ? data.form.updateUser.password
                        : data.edit_user.password,
                    confirm_password: data.form.updateUser.confirm_password
                        ? data.form.updateUser.confirm_password
                        : data.edit_user.confirm_password,
                    address: data.form.updateUser.address
                        ? data.form.updateUser.address
                        : data.edit_user.address,
                    contact: data.form.updateUser.contact
                        ? data.form.updateUser.contact
                        : data.edit_user.contact,
                    birthday: data.form.updateUser.birthday
                        ? data.form.updateUser.birthday
                        : data.edit_user.birthday,
                },
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    data.modal.edit = false;
                    data.users.data.forEach((user, index) => {
                        if (user.id == data.edit_user.id) {
                            data.users.data[index] = res.data;
                        }
                    });
                    data.edit_user = "";
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        }

        watch(data, (val) => {
            console.log(val);
        });

        onMounted(() => {
            getAllUsers();
        });

        return {
            selectAll,
            prevPage,
            goToPage,
            nextPage,
            createUser,
            initAddModal,
            searchUser,
            initDeleteModal,
            initEditModal,
            deleteUser,
            updateUser,
            ...toRefs(data),
        };
    },
});
</script>

<style scoped>
</style>
