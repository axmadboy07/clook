const { sequelize } = require('./models');

async function fixSchema() {
    try {
        console.log("Checking tables...");
        await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
        
        const [tables] = await sequelize.query(`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema='public' AND column_name='id';
        `);
        console.log("Tables with id column:", tables);

        for (const row of tables) {
            const table = row.table_name;
            if (row.data_type === 'uuid') {
                try {
                    await sequelize.query(`ALTER TABLE "${table}" ALTER COLUMN id SET DEFAULT gen_random_uuid();`);
                    console.log(`Set gen_random_uuid default for ${table}`);
                } catch (e) {
                    console.error(`Error setting default for ${table}:`, e.message);
                }
            }
        }

        // Test inserting users
        const { User } = require('./models');
        const userCount = await User.count().catch(() => 0);
        console.log("Current user count:", userCount);
        if (userCount === 0) {
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
            console.log("Seeded users created:", admin.id, client.id);
        }

        const allUsers = await User.findAll();
        console.log("All DB users:", allUsers.map(u => ({ id: u.id, email: u.email, name: u.full_name, role: u.role })));
    } catch (err) {
        console.error("Fix schema error:", err);
    } finally {
        process.exit(0);
    }
}

fixSchema();
