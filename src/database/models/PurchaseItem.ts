import { DataTypes, Model, Sequelize, Optional } from "sequelize";

export interface PurchaseItemAttributes { /* ... */ }
export interface PurchaseItemCreationAttributes extends Partial<PurchaseItemAttributes> { }

export default (sequelize: Sequelize) => {
    class PurchaseItem extends Model<PurchaseItemAttributes, PurchaseItemCreationAttributes> implements PurchaseItemAttributes {
        public id!: number;
        public purchaseId!: number;
        public productId!: number;
        public quantity!: number;
        public price!: number;
    }

    PurchaseItem.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        purchaseId: { type: DataTypes.INTEGER, allowNull: false, field: "purchase_id" },
        productId: { type: DataTypes.INTEGER, allowNull: false, field: "product_id" },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false }
    }, {
        sequelize,
        modelName: "PurchaseItem",
        tableName: "purchase_items",
        underscored: true,
        timestamps: true
    });

    return PurchaseItem;
};
