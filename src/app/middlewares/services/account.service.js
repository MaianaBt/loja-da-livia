const { User } = require('../../models');

const register = async (data) => {
    try {
        const user = await User.findOne({ where: { email: data.email } });
        if (user)
            return null;

        const { id, name, email } = await User.create(data);

        return { id, name, email };
    } catch (error) {
        throw error;
    }
}

module.exports = { register }