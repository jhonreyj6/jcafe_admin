<template>
    <div>
        <Aside />

        <div class="md:ml-64 ml-16 max-w-7xl pt-20 px-4">
            <div
                class="relative overflow-x-auto overflow-y-clip shadow-md sm:rounded-lg p-8 border"
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
                                    @click="modal.addProduct = true"
                                >
                                    Add Product
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    role="button"
                                    class="block px-4 py-2 cursor-pointer hover:bg-indigo-50"
                                    @click="modal.deleteProduct = true"
                                    >Delete Product</a
                                >
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                    <label for="table-search-games" class="sr-only"
                        >Search</label
                    >
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
                            id="table-search-games"
                            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search Product"
                        />
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input
                                        id="checkbox-all"
                                        ref="checkbox_all"
                                        @change="selectAll($event)"
                                        type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label for="checkbox-all" class="sr-only"
                                        >checkbox</label
                                    >
                                </div>
                            </th>
                            <th scope="col" class="px-2 py-3">ID</th>
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="bg-white border-b items-center hover:bg-gray-50"
                            v-for="product in products.data"
                            :key="product.id"
                        >
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input
                                        :value="product.id"
                                        :id="product.id"
                                        v-model="selected"
                                        type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label :for="product.id" class="sr-only"
                                        >checkbox</label
                                    >
                                </div>
                            </td>
                            <td class="px-2 py-4">
                                <div class="text-base text-dark font-semibold">
                                    {{ product.id }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-base text-dark font-semibold">
                                    {{ product.name }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <button
                                    class="font-medium text-blue-600"
                                    @click="modal.updateProduct = true; modal.update_data = product"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination :data="products" />
            </div>
        </div>

        <!-- add modal -->
        <Dialog
            :open="modal.addProduct"
            @close="setAddProductModal"
            class="z-50 bg-opacity-50 fixed bg-black w-full overflow-x-hidden overflow-y-auto inset-0 max-h-full"
        >
            <DialogPanel
                class="relative w-full max-w-5xl max-h-full justify-center mx-auto mt-24"
            >
                <div class="relative bg-white rounded-lg shadow p-8">
                    <DialogTitle class="text-xl font-bold mb-4 border-b"
                        >Add Product</DialogTitle
                    >
                    <DialogDescription>
                        <div class="flex flex-row gap-4 mb-4">
                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    v-model="form.addProduct.name"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Rating</label
                                >
                                <input
                                    type="number"
                                    v-model="form.addProduct.rating"
                                    max="5"
                                    min="0"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="flex flex-row gap-4 mb-4">
                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Description</label
                                >
                                <textarea
                                    v-model="form.addProduct.description"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <button
                                class="text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                type="button"
                                @click="addVariant"
                            >
                                <i class="fa-solid fa-plus mr-1"></i>Add Variant
                            </button>
                        </div>

                        <div
                            class="flex flex-row items-center gap-4 mb-4"
                            v-for="variant in form.addProduct.variant"
                            :key="variant"
                        >
                            <div class="w-full">
                                <input
                                    :id="`variant_value_${variant}`"
                                    ref="variant_value"
                                    placeholder="Value"
                                    type="number"
                                    min="1"
                                    max="5"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    :id="`variant_unit_${variant}`"
                                    ref="variant_unit"
                                    placeholder="Unit"
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    :id="`variant_price_${variant}`"
                                    ref="variant_price"
                                    placeholder="Price"
                                    type="number"
                                    min="1"
                                    max="5"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    type="number"
                                    ref="variant_stock"
                                    :id="`variant_stock_${variant}`"
                                    placeholder="Stock"
                                    min="1"
                                    max="5"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="">
                                <button
                                    class="border py-0.5 px-2 rounded-full focus:outline-none hover:bg-red-600"
                                    type="button"
                                    @click="deleteVariantDetails(variant)"
                                >
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-row gap-2 mb-8">
                            <div
                                class="flex items-center justify-center w-full"
                            >
                                <label
                                    for="dropzone-file"
                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center pt-5 pb-6"
                                    >
                                        <svg
                                            class="w-8 h-8 mb-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">
                                            <span class="font-semibold"
                                                >Click to upload</span
                                            >
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            PNG or JPG
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        @change="dropzoneAddProduct"
                                        type="file"
                                        class="hidden"
                                        accept="image/png, image/jpeg"
                                    />
                                </label>
                            </div>

                            <div
                                class="flex justify-center align-self-center text-center w-full p-3"
                                v-if="form.addProduct.temp_img"
                            >
                                <img
                                    :src="form.addProduct.temp_img"
                                    alt=""
                                    class="w-full h-64 border border-indigo-700 rounded"
                                />
                            </div>
                        </div>

                        <div class="flex flex-row gap-4 justify-center">
                            <button
                                type="button"
                                class="inline-flex text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                @click="modal.addProduct = false"
                            >
                                Cancel
                            </button>
                            <button
                                class="inline-flex text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                type="button"
                                @click="addProduct"
                            >
                                Add Product
                            </button>
                        </div>
                    </DialogDescription>
                </div>
            </DialogPanel>
        </Dialog>

        <!-- update modal -->
        <Dialog
            :open="modal.updateProduct"
            @close="setUpdateProductModal"
            class="z-50 bg-opacity-50 fixed bg-black w-full overflow-x-hidden overflow-y-auto inset-0 max-h-full"
        >
            <DialogPanel
                class="relative w-full max-w-5xl max-h-full justify-center mx-auto mt-24"
            >
                <div class="relative bg-white rounded-lg shadow p-8">
                    <DialogTitle class="text-xl font-bold mb-4 border-b"
                        >Update Product</DialogTitle
                    >
                    <DialogDescription>
                        <div class="flex flex-row gap-4 mb-4">
                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Name</label
                                >
                                <input
                                    :value="modal.update_data.name"
                                    :placeholder="modal.update_data.name"
                                    ref="update_product_name"
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Rating</label
                                >
                                <input
                                    :placeholder="modal.update_data.rating"
                                    ref="update_product_rating"
                                    :value="modal.update_data.rating"
                                    type="number"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="flex flex-row gap-4 mb-4">
                            <div class="w-full">
                                <label class="leading-7 text-sm text-gray-600"
                                    >Description</label
                                >
                                <textarea
                                    ref="update_product_description"
                                    :placeholder="modal.update_data.description"
                                    :value="modal.update_data.description"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <button
                                class="text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                type="button"
                            >
                                <i class="fa-solid fa-plus mr-1"></i>Add Variant
                            </button>
                        </div>

                        <div
                            class="flex flex-row items-center gap-4 mb-4"
                            v-for="variant in modal.update_data.get_variants"
                            :key="variant.id"
                        >
                            <div class="w-full">
                                <input
                                    placeholder="value"
                                    ref="variant_update_value"
                                    type="number"
                                    min="1"
                                    :value="variant.value"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    ref="variant_update_unit"
                                    :value="variant.unit"
                                    placeholder="unit"
                                    type="text"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    ref="variant_update_price"
                                    :value="variant.price"
                                    placeholder="price"
                                    type="number"
                                    min="1"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="w-full">
                                <input
                                    type="number"
                                    ref="variant_update_stock"
                                    :value="variant.stock"
                                    placeholder="stock"
                                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div class="">
                                <button
                                    class="border py-0.5 px-2 rounded-full focus:outline-none hover:bg-red-600"
                                    type="button"
                                >
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-row gap-2 mb-8">
                            <div
                                class="flex items-center justify-center w-full"
                            >
                                <label
                                    for="dropzone-update-file"
                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center pt-5 pb-6"
                                    >
                                        <svg
                                            class="w-8 h-8 mb-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">
                                            <span class="font-semibold"
                                                >Click to upload</span
                                            >
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            PNG or JPG
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-update-file"
                                        @change="dropzoneUpdateProduct"
                                        type="file"
                                        class="hidden"
                                        accept="image/png, image/jpeg"
                                    />
                                </label>
                            </div>

                            <div
                                class="flex justify-center align-self-center text-center w-full p-3"
                                v-if="modal.update_data.image_url"
                            >
                                <img
                                    v-if="form.updateProduct.temp_img"
                                    :src="form.updateProduct.temp_img"
                                    alt=""
                                    class="w-full h-64 border border-indigo-700 rounded"
                                />
                                <img
                                    v-else
                                    :src="modal.update_data.image_url"
                                    alt=""
                                    class="w-full h-64 border border-indigo-700 rounded"
                                />
                            </div>
                        </div>

                        <div class="flex flex-row gap-4 justify-center">
                            <button
                                class="inline-flex text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                type="button"
                                @click="updateProduct"
                            >
                                Update Product
                            </button>

                            <button
                                type="button"
                                class="inline-flex text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                @click="modal.updateProduct = false"
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
            :open="modal.deleteProduct"
            @close="setDeleteProductModal"
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
                                    @click="deleteProduct"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    class="text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                                    @click="modal.deleteProduct = false"
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
import Pagination from "../components/Pagination.vue";
import Stars from "../components/Stars.vue";
import Aside from "../components/Aside.vue";
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
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            modal: {
                addProduct: false,
                deleteProduct: false,
                // delete_data: "",
                updateProduct: false,
                update_data: "",
            },
            selected: [],
            // collection: {
            //     products: [],
            // },
            form: {
                addProduct: {
                    name: "",
                    stock: "",
                    image: "",
                    temp_img: "",
                    variant_count: 1,
                    variant: [1],
                    // variant_details: [],
                    description: "",
                    rating: "",
                },
                updateProduct: {
                    // name: "",
                    // stock: "",
                    image: "",
                    // description: "",
                    // rating: "",
                    temp_img: "",
                },
            },
            products: "",
        };
    },
    components: {
        Aside,
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
        Aside,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Pagination,
        Stars,
    },

    props: {},

    computed: {},

    methods: {
        nextPage(url) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.products = res.data;
                })
                .catch((err) => {});
        },

        prevPage(url) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.products = res.data;
                })
                .catch((err) => {});
        },

        goToPage(url, page) {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: `${url}?page=${page}`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.products = res.data;
                })
                .catch((err) => {});
        },

        deleteVariantDetails(data) {
            if (this.form.addProduct.variant_count > 1) {
                this.form.addProduct.variant.forEach((variant, index) => {
                    if (variant == data) {
                        this.form.addProduct.variant.splice(index, 1);
                    }
                });
            }
        },

        addVariant() {
            this.form.addProduct.variant.push(
                (this.form.addProduct.variant_count += 1)
            );
        },

        getProducts() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "get",
                url: `/api/products`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.products = res.data;
                })
                .catch((err) => {});
        },

        updateProduct() {
            const formData = new FormData();
            formData.append("id", this.modal.update_data.id);
            formData.append("name", this.$refs.update_product_name.value);
            formData.append("rating", this.$refs.update_product_rating.value);
            formData.append("description", this.$refs.update_product_description.value);
            formData.append("image", this.form.updateProduct.image);

            this.$refs.variant_update_value.forEach((data) => {
                formData.append("variant_update_value[]", data.value);
            });
            this.$refs.variant_update_price.forEach((data) => {
                formData.append("variant_update_price[]", data.value);
            });
            this.$refs.variant_update_stock.forEach((data) => {
                formData.append("variant_update_stock[]", data.value);
            });
            this.$refs.variant_update_unit.forEach((data) => {
                formData.append("variant_update_unit[]", data.value);
            });

            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "post",
                data: formData,
                url: `/api/products/update`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.modal.updateProduct = false;
                    this.products.data.forEach((product, index) => {
                        if (product.id == this.modal.update_data.id) {
                            this.products.data[index] = res.data;
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                });
        },

        deleteProduct() {
            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "delete",
                params: {
                    id: this.selected,  
                },
                url: `/api/products`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.products.data = this.products.data.filter((product) => {
                        return !this.selected.includes(product.id);
                    });
                    this.modal.deleteProduct = false;
                    this.selected = [];
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        addProduct() {
            const formData = new FormData();
            formData.append("name", this.form.addProduct.name);
            formData.append("rating", this.form.addProduct.rating);
            formData.append("description", this.form.addProduct.description);
            formData.append("image", this.form.addProduct.image);

            this.$refs.variant_value.forEach((data) => {
                formData.append("variant_value[]", data.value);
            });

            this.$refs.variant_unit.forEach((data) => {
                formData.append("variant_unit[]", data.value);
            });

            this.$refs.variant_stock.forEach((data) => {
                formData.append("variant_stock[]", data.value);
            });

            this.$refs.variant_price.forEach((data) => {
                formData.append("variant_price[]", data.value);
            });

            const AuthStr = "Bearer ".concat(userStore().user.access_token);
            axios({
                method: "post",
                data: formData,
                // params: {
                //     variant_details: this.form.addProduct.variant_details,
                // },
                url: `/api/products`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.form.addProduct.name = "";
                    this.form.addProduct.rating = "";
                    this.form.addProduct.description = "";
                    // this.form.addProduct.variant_details = [];
                    this.form.addProduct.image = "";
                    this.form.addProduct.variant_count = 0;
                    this.form.addProduct.variant = [];
                    this.modal.addProduct = false;
                    this.form.addProduct.temp_img = "";
                    this.products.data.push(res.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        },

        setAddProductModal(condition) {
            this.modal.addProduct = condition;
        },

        setUpdateProductModal(condition) {
            this.modal.updateProduct = condition;
        },

        setDeleteProductModal(condition) {
            this.modal.deleteProduct = condition;
        },

        dropzoneAddProduct(e) {
            this.form.addProduct.image =
                e.target.files[0] || e.dataTransfer.files[0];
            this.form.addProduct.temp_img = URL.createObjectURL(
                this.form.addProduct.image
            );
        },

        dropzoneUpdateProduct(e) {
            this.form.updateProduct.image =
                e.target.files[0] || e.dataTransfer.files[0];
            this.form.updateProduct.temp_img = URL.createObjectURL(
                this.form.updateProduct.image
            );
        },
        
        selectAll(e) {
            if (e.target.checked) {
                this.selected = [];
                this.products.data.forEach((elem) => {
                    this.selected.push(elem.id);
                });
            } else {
                this.selected = [];
            }
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
        this.getProducts();
    },
};
</script>

<style scoped>
</style>
