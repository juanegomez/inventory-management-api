import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import RoleModel from './Role';

// Interface para los atributos del usuario
interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    document: string;
    documentType: string;
    email: string;
    password: string;
    roleId: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

// Para creación de nuevos usuarios
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export default (sequelize: Sequelize) => {
    const Role = RoleModel(sequelize);

    class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        public id!: number;
        public firstName!: string;
        public lastName!: string;
        public document!: string;
        public documentType!: string;
        public email!: string;
        public password!: string;
        public roleId!: number;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    User.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            firstName: { type: DataTypes.STRING, allowNull: false, field: 'first_name' },
            lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
            document: { type: DataTypes.STRING, allowNull: false },
            documentType: { type: DataTypes.STRING, allowNull: false, field: 'document_type' },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'roles', key: 'id' },
                field: 'role_id'
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
            timestamps: true,
        }
    );

    User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })
    Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

    return User;
};