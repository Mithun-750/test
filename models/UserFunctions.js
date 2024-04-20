const User = require('./User');

class UserController {
    static async createUser(username, password) {
        try {
            const newUser = new User({
                username: username,
                password: password
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await User.findOne({ username: username });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(username, newUsername, newPassword) {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                throw new Error('User not found');
            }
            
            // Update username and password
            user.username = newUsername;
            user.password = newPassword;
            
            await user.save();
            
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserController;
