import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface ProductAttributes {
    id: number;
    batchNumber: string;
    name: string;
    price: number;
    quantity: number;
    entryDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Para creación, id y timestamps son opcionales
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export default (sequelize: Sequelize) => {
    class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
        public id!: number;
        public batchNumber!: string;
        public name!: string;
        public price!: number;
        public quantity!: number;
        public entryDate!: Date;

        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    Product.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        batchNumber: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'batch_number' },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        entryDate: { type: DataTypes.DATE, allowNull: false, field: 'entry_date' }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        underscored: true,
        timestamps: true
    });

    return Product;
};
