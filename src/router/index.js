import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../stores/userStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () =>
                import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
            meta: { disableIfLoggedIn: true },
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            meta: { requiresAuth: true },
            component: () =>
                import(
                    /* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"
                ),
        },
        {
            path: "/messages",
            name: "Message",
            meta: { requiresAuth: true },
            component: () =>
                import(
                    /* webpackChunkName: "Message" */ "../views/Message.vue"
                ),
        },
        {
            path: "/users",
            name: "User",
            component: () =>
                import(/* webpackChunkName: "User" */ "../views/User.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/posts",
            name: "Post",
            component: () =>
                import(/* webpackChunkName: "Post" */ "../views/Post.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/games",
            name: "Games",
            component: () =>
                import(/* webpackChunkName: "Games" */ "../views/Games.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/orders",
            name: "Orders",
            component: () =>
                import(/* webpackChunkName: "Orders" */ "../views/Orders.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/products",
            name: "Products",
            component: () =>
                import(
                    /* webpackChunkName: "Products" */ "../views/Products.vue"
                ),
            meta: { requiresAuth: true },
        },
        
        {
            path: "/:catchAll(.*)",
            name: "PageNotFound",
            component: () =>
                import(
                    /* webpackChunkName: "NotFound" */ "../views/PageNotFound.vue"
                ),
        },
        
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!userStore().access_token) {
            userStore().$reset();
            next({ path: "/", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.disableIfLoggedIn)) {
        if (userStore().access_token) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    next();
});

export default router;
