const router = require("express").Router()
const userController = require("../apis/user/userController")
const categoryController = require("../apis/category/categoryController")
const expenseController = require("../apis/expenses/expenseController")
const customerController = require("../apis/customer/customerController")
const shopController = require("../apis/shopkeeper/shopController")
const budgetController = require("../apis/budget/budgetcontroller")
const purchaseController = require("../apis/purchase/purchaseController")
const saleController = require("../apis/sales/saleController")

router.post("/user/addUser", userController.addUser)
router.post("/shopkeeper/addShopkeeper",shopController.addShopkeeper)

router.post("/login",userController.login)

router.use(require("../middleware/adminmiddleware"))


router.post("/user/showUser", userController.showUser)
router.post("/user/singleUser",userController.singleUser)
router.post("/user/updateUser",userController.updateUser)


router.post("/shopkeeper/showShopkeeper",shopController.showShopkeeper)
router.post("/shopkeeper/singleshop",shopController.singleShop)
router.post("/shopkeeper/updateShopkeeper",shopController.updateShop)


router.post("/category/addCategory", categoryController.addCategory)
router.post("/category/showCategory", categoryController.showCategory)
router.post("/category/singleCategory",categoryController.singleCategory)
router.post("/category/updateCategory",categoryController.updateCategory)


router.post("/expense/addExpense", expenseController.addExpense)
router.post("/expense/showExpense", expenseController.showExpense)
router.post("/expense/singleExpense", expenseController.singleExpense)
router.post("/expense/updateExpense",expenseController.updateExpense)

router.post("/budget/addBudget",budgetController.addbudget)
router.post("/budget/showBudget",budgetController.showbudget)
router.post("/budget/singleBudget",budgetController.singleBudget)
router.post("/budget/updateBudget",budgetController.updateBudget)

router.post("/purchase/addPurchase",purchaseController.addPurchase)
router.post("/purchase/showPurchase",purchaseController.showPurchase)
router.post("/purchase/singlePurchase",purchaseController.singlePurchase)
router.post("/purchase/updatePurchase",purchaseController.updatePurchase)

router.post("/sales/addSales",saleController.addSale)
router.post("/sales/showSales",saleController.showSales)
router.post("/sales/singleSales",saleController.singleSale)
router.post("/sales/updateSales",saleController.updateSales)

router.post("*",function(req,res){
    res.json({
        status:404,
        success:false,
        message:"Not Found."
    })
})

module.exports = router;

router.get("/", function (req, res) {
    res.json({
        status: 200,
        success: true,
        message: "Welcome to admin routes."
    })
})