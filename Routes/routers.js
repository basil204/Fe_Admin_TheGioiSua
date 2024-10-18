
const express = require("express");
const router = express.Router();
const fs = require("fs");
const {join} = require("path");
const { checkLogin } = require("../middleware/authMiddleware");
const createRouteHandler = require("../middleware/controllerHandler");

const InvoicedetailController = require("../controllers/ThuocTinhController/InvoicedetailController");
const InvoiceController = require("../controllers/ThuocTinhController/InvoiceController");
const MilkbrandController = require("../controllers/ThuocTinhController/MilkbrandController");
const MilkdetailController = require("../controllers/ThuocTinhController/MilkdetailController");
const MilktasteController = require("../controllers/ThuocTinhController/MilktasteController");
const MilktypeController = require("../controllers/ThuocTinhController/MilktypeController");
const PackagingunitController = require("../controllers/ThuocTinhController/PackagingunitController");
const ProductController = require("../controllers/ThuocTinhController/ProductController");
const TargetuserController = require("../controllers/ThuocTinhController/TargetuserController");
const UsagecapacityController = require("../controllers/ThuocTinhController/UsagecapacityController");
const UserinvoiceController = require("../controllers/ThuocTinhController/UserinvoiceController");
const VoucherController = require("../controllers/ThuocTinhController/VoucherController");

const routes = {
    Invoicedetail: InvoicedetailController,
    Invoice: InvoiceController,
    Milkbrand: MilkbrandController,
    Milkdetail: MilkdetailController,
    Milktaste: MilktasteController,
    Milktype: MilktypeController,
    Packagingunit: PackagingunitController,
    Product: ProductController,
    Targetuser: TargetuserController,
    Usagecapacity: UsagecapacityController,
    Userinvoice: UserinvoiceController,
    Voucher: VoucherController,
};

Object.entries(routes).forEach(([routeName, controller]) => {
    router.get(`/api/${routeName}/lst`, checkLogin, createRouteHandler(controller, `getAll${routeName}`));
    router.get(`/api/${routeName}/:id`, checkLogin, createRouteHandler(controller, `get${routeName}ById`));
    router.delete(`/api/${routeName}/:id`, checkLogin, createRouteHandler(controller, `delete${routeName}`));
    router.post(`/api/${routeName}/add`, checkLogin, createRouteHandler(controller, `add${routeName}`));
    router.put(`/api/${routeName}/update/:id`, checkLogin, createRouteHandler(controller, `update${routeName}`));
});

const renderLayout = (content) => {
    const header = fs.readFileSync(join(__dirname, "../views/layout/header.html"), "utf-8");
    const footer = fs.readFileSync(join(__dirname, "../views/layout/footer.html"), "utf-8");
    const layout = fs.readFileSync(join(__dirname, "../views/layout.html"), "utf-8");
    return layout
        .replace("{{header}}", header)
        .replace("{{content}}", content)
        .replace("{{footer}}", footer);
};

const viewRoutes = [
    { path: "/", view: "index.html" },
    { path: "/form-add-nhan-vien", view: "form-add-nhan-vien.html" },
    { path: "/table-data-product", view: "table-data-product.html" },
    { path: "/form-add-san-pham", view: "form-add-san-pham.html" },
    { path: "/table-data-khach-hang", view: "table-data-khach-hang.html" },
    { path: "/table-data-oder", view: "table-data-oder.html" },
    { path: "/table-data-table", view: "table-data-table.html" },
    { path: "/quan-ly-bao-cao", view: "quan-ly-bao-cao.html" },
    { path: "/form-add-don-hang", view: "form-add-don-hang.html" },
];

viewRoutes.forEach(({ path, view }) => {
    router.get(path, checkLogin, (req, res) => {
        const content = fs.readFileSync(join(__dirname, `../views/${view}`), "utf-8");
        res.send(renderLayout(content));
    });
});

module.exports = router;
