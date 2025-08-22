import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Role extends Model { }

    Role.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false
    });

    return Role;
};
