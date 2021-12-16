import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";
import Category from "./category.js";
import ProductCategory from "./productCategory.js";

// One to many product to reviews, one product, many reviews
Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

// One to many user to reviews, one user, many reviews
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

// Many to many products to categories, products can have many categories and vice versa
Product.belongsToMany(Category, { 
    through: ProductCategory,
    onDelete: "CASCADE",
});
Category.belongsToMany(Product, {
    through: ProductCategory,
    onDelete: "CASCADE",
});

export default { Category, Product, Review, User, ProductCategory };