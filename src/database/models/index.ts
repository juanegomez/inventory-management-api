import sequelize from '../../config/database';
import UserModel from './User';
import RoleModel from './Role';
import ProductModel from './Product';
import PurchaseModel from './Purchase';
import PurchaseItemModel from './PurchaseItem';

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const Product = ProductModel(sequelize);
const Purchase = PurchaseModel(sequelize);
const PurchaseItem = PurchaseItemModel(sequelize);

// Asociaciones
Purchase.belongsTo(User, { foreignKey: "userId", as: "user" });
Purchase.hasMany(PurchaseItem, { foreignKey: "purchaseId", as: "items" });

PurchaseItem.belongsTo(Purchase, { foreignKey: "purchaseId", as: "purchase" });
PurchaseItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

Product.hasMany(PurchaseItem, { foreignKey: "productId", as: "purchaseItems" });

export { sequelize, User, Role, Product, Purchase, PurchaseItem };
