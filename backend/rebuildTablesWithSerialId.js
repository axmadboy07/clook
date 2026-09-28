const { sequelize, User, Category, Product, Salon, ContactInquiry, BlogPost, Faq, CartItem, WishlistItem, Review, Order, OrderItem, Payment, Address } = require('./models');

async function rebuild() {
    try {
        console.log("Dropping old UUID tables and recreating with INTEGER autoIncrement (1, 2, 3...)...");
        await sequelize.sync({ force: true });
        console.log("All tables recreated successfully with SERIAL INTEGER IDs.");

        // 1. Seed Users (ID 1, 2...)
        const admin = await User.create({
            full_name: "Admin Director",
            email: "admin@chronos.uz",
            phone: "+998901234567",
            password_hash: "admin123",
            role: "admin"
        });

        const client = await User.create({
            full_name: "Alisher Navoiy",
            email: "alisher@aura.uz",
            phone: "+998909876543",
            password_hash: "user123",
            role: "customer"
        });

        // 2. Seed Categories (ID 1, 2, 3...)
        const cat1 = await Category.create({ name: "Klassik Soatlar", slug: "classic" });
        const cat2 = await Category.create({ name: "Sport Xronograflar", slug: "sport" });
        const cat3 = await Category.create({ name: "Ayollar Kolleksiyasi", slug: "ladies" });

        // 3. Seed Products (ID 1, 2, 3...)
        await Product.create({
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

        await Product.create({
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

        await Product.create({
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

        console.log("Seeding complete!");
        const users = await User.findAll();
        console.log("Users in DB:", users.map(u => ({ id: u.id, name: u.full_name, email: u.email, role: u.role })));
    } catch (err) {
        console.error("Rebuild error:", err);
    } finally {
        process.exit(0);
    }
}

rebuild();
