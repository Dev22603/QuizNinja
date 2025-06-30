import bcrypt from 'bcryptjs';
import User from '../models/user.model.mjs';
import { ROLES } from '../constants/constants.mjs';
import connectDB from '../db/database.mjs';

const initAdmin = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: ROLES.ADMIN });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const adminData = {
            name: 'Dev Bachani',
            email: 'devcodes2206@gmail.com',
            phone_number: '9173706507',
            password: 'Admin@123', // This should be changed after first login
            role: ROLES.ADMIN,
            tenantId: null // Admin is not associated with any tenant
        };

        // Hash password
        const salt = await bcrypt.genSalt(10);
        adminData.password = await bcrypt.hash(adminData.password, salt);

        // Create admin user
        const admin = new User(adminData);
        await admin.save();

        console.log('Admin user created successfully!');
        console.log('Email:', adminData.email);
        console.log('Password: Admin@123');
        console.log('IMPORTANT: Change this password after first login!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error initializing admin:', error);
        process.exit(1);
    }
};

initAdmin();
