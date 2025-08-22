import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface PurchaseAttributes {
    id: number;
    userId: number;
    total: number;
    purchaseDate: Date;
}

// Solo 'id' y 'purchaseDate' serán opcionales al crear
export interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id' | 'purchaseDate'> { }

export default (sequelize: Sequelize) => {
    class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
        public id!: number;
        public userId!: number;
        public total!: number;
        public purchaseDate!: Date;
    }

    Purchase.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
        total: { type: DataTypes.FLOAT, allowNull: false },
        purchaseDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'purchase_date' }
    }, {
        sequelize,
        modelName: 'Purchase',
        tableName: 'purchases',
        underscored: true,
        timestamps: true
    });

    return Purchase;
};