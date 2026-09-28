const {
    User,
    Category,
    Product,
    Salon,
    ContactInquiry,
    BlogPost,
    Faq,
    CartItem,
    WishlistItem,
    Review,
    Order,
    OrderItem,
    Payment,
    Address,
    sequelize
} = require('./models');

async function seedAll() {
    try {
        console.log("Starting full seed...");

        // 1. Users
        let admin = await User.findOne({ where: { email: 'admin@chronos.uz' } });
        if (!admin) {
            admin = await User.create({
                full_name: "Admin Director",
                email: "admin@chronos.uz",
                phone: "+998901234567",
                password_hash: "admin123",
                role: "admin"
            });
        }

        let client = await User.findOne({ where: { email: 'alisher@aura.uz' } });
        if (!client) {
            client = await User.create({
                full_name: "Alisher Navoiy",
                email: "alisher@aura.uz",
                phone: "+998909876543",
                password_hash: "user123",
                role: "customer"
            });
        }

        // 2. Categories
        let cat1 = await Category.findOne({ where: { slug: 'classic' } });
        if (!cat1) {
            cat1 = await Category.create({ name: "Klassik Soatlar", slug: "classic" });
        }
        let cat2 = await Category.findOne({ where: { slug: 'sport' } });
        if (!cat2) {
            cat2 = await Category.create({ name: "Sport Xronograflar", slug: "sport" });
        }
        let cat3 = await Category.findOne({ where: { slug: 'ladies' } });
        if (!cat3) {
            cat3 = await Category.create({ name: "Ayollar Kolleksiyasi", slug: "ladies" });
        }

        // 3. Products
        let prod1 = await Product.findOne({ where: { name: "Rolex Daytona Gold" } });
        if (!prod1) {
            prod1 = await Product.create({
                category_id: cat1.id,
                name: "Rolex Daytona Gold",
                brand: "Rolex",
                price: 38500.00,
                stock: 3,
                description: "Haute Horlogerie shoh asari, 18k sariq oltin korpus va COSC xronometr mexanizmi.",
                image_url: "/src/assets/products/rolex-daytona.jpg",
                movement: "Automatic",
                case_material: "18k Yellow Gold",
                dial_color: "Gold",
                is_featured: true,
                is_trending: true
            });
        }

        let prod2 = await Product.findOne({ where: { name: "Tissot PRX Powermatic 80" } });
        if (!prod2) {
            prod2 = await Product.create({
                category_id: cat1.id,
                name: "Tissot PRX Powermatic 80",
                brand: "Tissot",
                price: 775.00,
                stock: 12,
                description: "80 soatlik quvvat zaxirasi, Nivachron prujinasi va retro 1978 dizayni.",
                image_url: "/src/assets/products/tissot-prx.jpg",
                movement: "Automatic",
                case_material: "Stainless Steel",
                dial_color: "Rose Gold",
                is_featured: true,
                is_trending: true
            });
        }

        let prod3 = await Product.findOne({ where: { name: "Seiko Prospex Diver 200M" } });
        if (!prod3) {
            prod3 = await Product.create({
                category_id: cat2.id,
                name: "Seiko Prospex Diver 200M",
                brand: "Seiko",
                price: 1250.00,
                stock: 8,
                description: "200 metr suvga chidamlilik, Lumibrite siferblat va 6R35 kalibri.",
                image_url: "/src/assets/products/seiko-diver.jpg",
                movement: "Automatic",
                case_material: "Titanium",
                dial_color: "Blue Ocean",
                is_featured: true,
                is_trending: false
            });
        }

        // 4. Addresses
        let addr1 = await Address.findOne({ where: { user_id: client.id } });
        if (!addr1) {
            addr1 = await Address.create({
                user_id: client.id,
                city: "Toshkent",
                street: "Chilonzor tumani, 9-mavze, 14-uy",
                phone: client.phone || "+998909876543"
            });
        }

        // 5. Orders & OrderItems
        let order1 = await Order.findOne({ where: { user_id: client.id } });
        if (!order1) {
            order1 = await Order.create({
                user_id: client.id,
                address_id: addr1.id,
                total_amount: 950.00,
                status: "delivered",
                currency: "USD"
            });

            await OrderItem.create({
                order_id: order1.id,
                product_id: prod2.id,
                quantity: 1,
                unit_price: 950.00
            });

            await Payment.create({
                order_id: order1.id,
                method: "Payme",
                status: "completed",
                amount: 950.00,
                paid_at: new Date()
            });
        }

        // 6. Reviews
        let rev1 = await Review.findOne({ where: { product_id: prod1.id } });
        if (!rev1) {
            await Review.create({
                user_id: client.id,
                product_id: prod1.id,
                rating: 5,
                comment: "Aql bovar qilmas darajada nafis va aniq soat. CHRONOS xizmatiga 5 yulduz!"
            });
        }

        // 7. Salons
        const salonCount = await Salon.count().catch(() => 0);
        if (salonCount === 0) {
            await Salon.bulkCreate([
                {
                    name: "Genève Maison Mère",
                    city: "Genève",
                    country: "Switzerland",
                    address: "Rue du Rhône 42, 1204 Genève",
                    phone: "+41 22 819 9000"
                },
                {
                    name: "Mayfair Flagship",
                    city: "London",
                    country: "United Kingdom",
                    address: "144 New Bond St, Mayfair, London W1S 2PF",
                    phone: "+44 20 7493 8800"
                },
                {
                    name: "DIFC VIP Lounge",
                    city: "Dubai",
                    country: "UAE",
                    address: "Gate Village, Building 3, DIFC, Dubai",
                    phone: "+971 4 362 7000"
                }
            ]);
        }

        // 8. Contact Inquiries
        const inqCount = await ContactInquiry.count().catch(() => 0);
        if (inqCount === 0) {
            await ContactInquiry.create({
                name: "Alisher Navoiy",
                email: "alisher@aura.uz",
                phone: "+998909876543",
                interest: "Maxsus VIP Ko‘rik va Buyurtma",
                location: "Toshkent",
                message: "Rolex Daytona Gold modelini VIP yetkazib berish shartlari bilan tanishmoqchiman."
            });
        }

        // 9. Blog Posts
        const blogCount = await BlogPost.count().catch(() => 0);
        if (blogCount === 0) {
            await BlogPost.bulkCreate([
                {
                    title: "2026-yilning Eng Nufuzli Mexanik Soatlari",
                    slug: "top-luxury-watches-2026",
                    excerpt: "Jeneva soatsozlik ko‘rgazmasidagi eng sara yangiliklar va COSC sertifikatli kalibrlar tahlili.",
                    content: "Shveytsariya Haute Horlogerie an'analari bugungi kunda ilg'or nano-materiallar bilan boyitilmoqda...",
                    author: "Jean-Claude Biver"
                },
                {
                    title: "Soat Mexanizmini Saqlash va Tozalash Bo‘yicha Qo‘llanma",
                    slug: "watch-care-guide",
                    excerpt: "Qimmatbaho mexanik soatlaringiz o‘n yillab o‘z aniqligi va jilosini yo‘qotmasligi uchun mutaxassis maslahatlari.",
                    content: "Suvga chidamlilik va magnit maydonlar ta'siridan himoya qilish asosiy qoidalar sirasiga kiradi...",
                    author: "Master Horologist"
                }
            ]);
        }

        // 10. FAQs
        const faqCount = await Faq.count().catch(() => 0);
        if (faqCount === 0) {
            await Faq.bulkCreate([
                {
                    question: "CHRONOS soatlariga rasmiy kafolat beriladimi?",
                    answer: "Ha, har bir soatimiz 2 yildan 5 yilgacha xalqaro zavod kafolati va haqiqiylik xologrammasi bilan taqdim etiladi."
                },
                {
                    question: "O‘zbekiston bo‘ylab yetkazib berish xizmati qanday ishlaydi?",
                    answer: "Barcha xaridlar maxsus zirhli kuryer orqali Toshkent bo‘ylab 24 soatda, viloyatlarga 2-3 ish kunida bepul yetkaziladi."
                },
                {
                    question: "To‘lov usullari qanday?",
                    answer: "Biz Payme, Click, Uzum, Visa, MasterCard hamda naqd to‘lovlarni qabul qilamiz."
                }
            ]);
        }

        // 11. CartItem & WishlistItem sample
        const cartCount = await CartItem.count().catch(() => 0);
        if (cartCount === 0) {
            await CartItem.create({
                user_id: client.id,
                product_id: prod1.id,
                quantity: 1
            });
        }

        const wishCount = await WishlistItem.count().catch(() => 0);
        if (wishCount === 0) {
            await WishlistItem.create({
                user_id: client.id,
                product_id: prod2.id
            });
        }

        console.log("Full seed completed successfully!");
    } catch (e) {
        console.error("Seed error:", e);
    }
}

if (require.main === module) {
    seedAll().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seedAll;
