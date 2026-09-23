const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

/**
 * Universal request function with error handling & JSON formatting
 */
async function request(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // Agar token bo'lsa, Authorization header qo'shish
    const token = localStorage.getItem("token");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(data?.message || data?.error || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`API Error [${options.method || "GET"} ${endpoint}]:`, error.message);
        throw error;
    }
}

// ===================== API MODULLARI =====================

// 1. Auth & Users API
export const authApi = {
    register: (userData) => request("/users", { method: "POST", body: JSON.stringify(userData) }),
    getAllUsers: () => request("/users"),
    getUserById: (id) => request(`/users/${id}`),
    updateUser: (id, data) => request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),
};

// 2. Products API
export const productsApi = {
    getAll: () => request("/products"),
    getById: (id) => request(`/products/${id}`),
    create: (product) => request("/products", { method: "POST", body: JSON.stringify(product) }),
    update: (id, product) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(product) }),
    delete: (id) => request(`/products/${id}`, { method: "DELETE" }),
};

// 3. Categories API
export const categoriesApi = {
    getAll: () => request("/categories"),
    getById: (id) => request(`/categories/${id}`),
    create: (category) => request("/categories", { method: "POST", body: JSON.stringify(category) }),
    update: (id, category) => request(`/categories/${id}`, { method: "PUT", body: JSON.stringify(category) }),
    delete: (id) => request(`/categories/${id}`, { method: "DELETE" }),
};

// 4. Cart API
export const cartApi = {
    getAll: () => request("/cart-items"),
    addItem: (item) => request("/cart-items", { method: "POST", body: JSON.stringify(item) }),
    updateItem: (id, data) => request(`/cart-items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    removeItem: (id) => request(`/cart-items/${id}`, { method: "DELETE" }),
};

// 5. Wishlist API
export const wishlistApi = {
    getAll: () => request("/wishlist-items"),
    addItem: (item) => request("/wishlist-items", { method: "POST", body: JSON.stringify(item) }),
    removeItem: (id) => request(`/wishlist-items/${id}`, { method: "DELETE" }),
};

// 6. Orders API
export const ordersApi = {
    getAll: () => request("/orders"),
    getById: (id) => request(`/orders/${id}`),
    create: (order) => request("/orders", { method: "POST", body: JSON.stringify(order) }),
    updateStatus: (id, status) => request(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
};

// 7. Reviews API
export const reviewsApi = {
    getAll: () => request("/reviews"),
    create: (review) => request("/reviews", { method: "POST", body: JSON.stringify(review) }),
    delete: (id) => request(`/reviews/${id}`, { method: "DELETE" }),
};

// 8. Salons & Contact Inquiries API
export const salonsApi = {
    getAll: () => request("/salons"),
    create: (salon) => request("/salons", { method: "POST", body: JSON.stringify(salon) }),
};

export const contactApi = {
    sendInquiry: (inquiry) => request("/contact-inquiries", { method: "POST", body: JSON.stringify(inquiry) }),
    getAllInquiries: () => request("/contact-inquiries"),
};

// 9. Blog & FAQ API
export const blogApi = {
    getAll: () => request("/blog-posts"),
    create: (post) => request("/blog-posts", { method: "POST", body: JSON.stringify(post) }),
};

export const faqApi = {
    getAll: () => request("/faqs"),
    create: (faq) => request("/faqs", { method: "POST", body: JSON.stringify(faq) }),
};

export default {
    auth: authApi,
    products: productsApi,
    categories: categoriesApi,
    cart: cartApi,
    wishlist: wishlistApi,
    orders: ordersApi,
    reviews: reviewsApi,
    salons: salonsApi,
    contact: contactApi,
    blog: blogApi,
    faq: faqApi,
};
