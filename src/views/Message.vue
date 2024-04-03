<template>
    <div>
        <Aside />

        <div class="flex flex-row gap-4 ml-16 md:ml-64 w-auto">
            <div class="bg-indigo-50 fixed h-full w-80 pt-20 z-10">
                <div class="flex flex-row gap-2 align-center mb-4 px-2">
                    <h3 class="text-1xl font-semibold ms-1">Messages</h3>
                    <div class="bg-red-500 px-2 rounded-full text-white">3</div>
                    <div class="ms-auto">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div class="w-full mb-4 px-2">
                    <div class="relative h-10 w-full min-w-[200px]">
                        <div
                            class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center"
                        >
                            <i
                                class="fas fa-search text-indigo-700"
                                aria-hidden="true"
                            ></i>
                        </div>
                        <input
                            class="peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=""
                            @keyup="searchUser"
                            v-model="form.search"
                        />
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Search
                        </label>
                    </div>
                </div>
                <div class="flex flex-col h-full overflow-y-scroll">
                    <div
                        class="border bg-white cursor-pointer border-l-indigo-700 border-l-8 mx-2"
                        v-for="room in chat.rooms"
                        :key="room.id"
                        @click="openChat(room)"
                    >
                        <div class="p-2 flex flex-row gap-2 items-center">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                class="w-14 h-full rounded-full"
                                alt=""
                            />
                            <div class="w-full">
                                <div class="flex flex-row items-center">
                                    <h3
                                        class="text-1xl text-indigo-700 font-bold"
                                    >
                                        {{ room.get_user_details.first_name }}
                                        {{ room.get_user_details.last_name }}
                                    </h3>
                                    <div
                                        class="ms-auto text-white text-sm bg-red-500 px-2 py-0.5 rounded-full"
                                    >
                                        {{ room.get_unread_chat.length }}
                                    </div>
                                </div>
                                <p v-if="room.get_unread_chat.length">
                                    {{ room.get_unread_chat[0].message }}
                                </p>
                                <p v-else>No new message</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ml-80 pt-16 h-screen w-full" v-if="currentRoom">
                <div class="flex flex-col gap-2 h-full">
                    <div
                        class="border bg-white shadow-md p-4 flex flex-row items-center gap-2 px-6 w-full"
                    >
                        <div class="relative h-10 w-full">
                            <div
                                class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center"
                            >
                                <i
                                    class="fas fa-search text-indigo-700"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <input
                                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 px-3 py-2 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                                Search Message
                            </label>
                        </div>
                        <div>
                            <button
                                class="inline-flex text-white bg-indigo-700 border-0 p-2.5 focus:outline-none hover:bg-indigo-500 rounded text-lg"
                            >
                                <i class="fa regular fa-cog"></i>
                            </button>
                        </div>
                    </div>

                    <div
                        class="overflow-y-scroll h-full"
                        ref="chat_div"
                        @scroll="paginateMessages"
                    >
                        <div
                            v-for="chat in chat.collection.data"
                            :key="chat.id"
                        >
                            <div
                                class="px-6 py-2 flex flex-row-reverse gap-4"
                                v-if="chat.user_id != authUser.id"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                    class="w-12 h-12 rounded-full"
                                />
                                <div class="border shadow py-2 rounded px-4">
                                    {{ chat.message }}
                                </div>
                            </div>
                            <div class="px-6 py-2 flex flex-row gap-4" v-else>
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                    class="w-12 h-12 rounded-full"
                                />
                                <div
                                    class="border shadow py-2 rounded px-4 bg-indigo-100"
                                >
                                    {{ chat.message }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer class="w-full">
                        <div
                            class="border bg-white shadow-md p-4 flex flex-row items-center gap-2 px-6"
                        >
                            <div class="relative h-10 w-full">
                                <div
                                    class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center"
                                >
                                    <a role="button">
                                        <i
                                            class="fa-solid fa-paperclip text-indigo-700"
                                            aria-hidden="true"
                                        ></i>
                                    </a>
                                </div>
                                <input
                                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 px-3 py-2 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=""
                                    v-model="form.message"
                                    @keyup="enterMessage"
                                />
                                <label
                                    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                    Send Message
                                </label>
                            </div>
                            <div>
                                <button
                                    class="inline-flex text-indigo-700 border-0 p-2.5 focus:outline-none hover:text-white hover:bg-indigo-500 rounded text-lg"
                                    @click="sendMessage"
                                >
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Aside from "../components/Aside.vue";
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            chat: {
                paginateState: false,
                collection: "",
                id_collection: [],
                rooms_active: [],
                rooms: "",
            },
            currentRoom: "",
            form: {
                message: "",
                search: "",
            },
            messageState: false,
        };
    },
    components: {
        Aside,
    },

    props: {},

    computed: {
        authUser() {
            return userStore().user;
        },
    },

    methods: {
        searchUser() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                params: { query: this.form.search },
                url: `/api/chat/admin/search`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.chat.rooms = res.data;
                })
                .catch((err) => {});
        },

        openChat(room) {
            this.currentRoom = room.id;
            this.chat.rooms_active.push(room.id);
            this.messageState = false;
        },

        paginateMessages(e) {
            if (
                e.target.scrollTop < 100 &&
                this.chat.paginateState == false &&
                this.chat.collection.next_page_url
            ) {
                this.chat.paginateState = true;
                let last_scrollT = this.$refs.chat_div.scrollTop;

                const AuthStr = "Bearer ".concat(userStore().access_token);
                axios({
                    method: "GET",
                    params: {
                        room_id: this.currentRoom,
                    },
                    url: this.chat.collection.next_page_url,
                    headers: { Authorization: AuthStr },
                })
                    .then((res) => {
                        res.data.data.forEach((data, index) => {
                            if (!this.chat.id_collection.includes(data.id)) {
                                this.chat.collection.data.unshift(data);
                                this.chat.id_collection.push(data.id);
                            }
                        });

                        this.chat.collection.next_page_url =
                            res.data.next_page_url;
                        this.chat.paginateState = false;
                        this.$refs.chat_div.scrollTop = last_scrollT - 55;
                    })
                    .catch((err) => {
                        console.log(err.response.data.message);
                    });
            }
        },

        enterMessage(e) {
            if (e.keyCode == 13) {
                this.sendMessage();
            }
        },

        getChatMessages() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "GET",
                params: {
                    room_id: this.currentRoom,
                },
                url: `/api/chat/admin`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.chat.collection = res.data;
                    res.data.data.forEach((element) => {
                        if (!this.chat.id_collection.includes(element.id)) {
                            this.chat.id_collection.push(element.id);
                        }
                    });
                    this.chat.collection.data.reverse();
                    this.messageState = true;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        disconnectAllChat(room) {
            for (let $i = 0; $i < this.chat.rooms_active.length; $i++) {
                window.Echo.leave("chat." + this.chat.rooms_active[$i]);
            }
        },

        getAllRooms() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                url: `/api/chat/admin/room`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.chat.rooms = res.data;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        loadNewMessages() {
            this.getChatMessages();

            let vm = this;
            window.Echo.private("chat." + this.currentRoom).listen(
                ".message.new",
                (e) => {
                    vm.chat.collection.data.push(e.chat);
                }
            );
        },

        sendMessage() {
            this.chat.collection.data.unshift({
                id: null,
                message: this.form.message,
                room_id: this.currentRoom,
                user_id: this.authUser.id,
                created_at: null,
                updated_at: null,
            });

            let message = this.form.message;
            this.form.message = "";

            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                params: {
                    message: message,
                    room_id: this.currentRoom,
                },
                url: `/api/chat/admin`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {})
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },
    },

    watch: {
        // $data: {
        //     handler: function (val, oldVal) {
        //         console.log("watcher: ", val);
        //     },
        //     deep: true,
        // },

        // $props: {
        //     handler: function (val, oldVal) {
        //         console.log("watcher: ", val);
        //     },
        //     deep: true,
        // },

        currentRoom: function (val, oldVal) {
            window.Echo.connector.options.auth.headers.Authorization =
                "Bearer " + userStore().access_token;
            this.loadNewMessages();
        },
    },

    updated() {
        if (this.messageState) {
            this.$refs.chat_div.scrollTop = this.$refs.chat_div.scrollHeight;
            this.messageState = false;
        }
    },

    beforeMounted() {},

    mounted() {
        this.getAllRooms();
    },

    beforeUnmount() {
        this.disconnectAllChat();
    },
};
</script>

<style scoped>
</style>
