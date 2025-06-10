import sequelize from '../libs/sequelize.js';
// Get the strongly typed model from Sequelize's registry
const userModel = sequelize.models.User;
class UserService {
    async createUser(data) {
        try {
            const newUser = await userModel.create(data);
            return newUser;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
    async getUsers() {
        try {
            const users = await userModel.findAll();
            return users;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }
    async getUserById(id) {
        try {
            const user = await userModel.findByPk(id);
            return user;
        }
        catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            throw new Error('Failed to fetch user');
        }
    }
    async updateUser(data) {
        try {
            const user = await userModel.findByPk(data.id);
            if (!user)
                return null;
            await user.update({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            return user;
        }
        catch (error) {
            console.error(`Error updating user with id ${data.id}:`, error);
            throw new Error('Failed to update user');
        }
    }
    async deleteUser(id) {
        try {
            const user = await userModel.findByPk(id);
            if (!user)
                return false;
            await user.destroy();
            return true;
        }
        catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw new Error('Failed to delete user');
        }
    }
}
export default UserService;
