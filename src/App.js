import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// import PrivateRoute from '../components/route/PrivateRoute';
// import AdminRoute from './components/route/AdminRoute';

//core
import HomePage from './pages/core/HomePage';
import ProductSearchPage from "./pages/core/ProductSearchPage";
import CategoryPage from "./pages/core/CategoryPage";
import ProductDetailPage from "./pages/product/DetailPage";

//admin
// import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminUserPage from './pages/admin/UserPage';
import AdminCategoryPage from './pages/admin/CategoryPage';
import AdminCreateCategoryPage from './pages/admin/CreateCategoryPage';
import AdminEditCategoryPage from './pages/admin/EditCategoryPage';
import AdminProductPage from './pages/admin/ProductPage'

//account
import ProfilePage from "./pages/account/ProfilePage";
import AddressesPage from "./pages/account/AddressesPage";
import FollowingPage from "./pages/account/FollowingPage"; //api bị lỗi
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
// import PurchasePage from "./pages/account/PurchasePage";
import CartPage from "./pages/account/CartPage";
// import OrderDetailPage from "./pages/account/OrderDetailPage";




function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" exact element= {<HomePage/>}/>
          <Route
            path="/products/search"
            exact
            element= {<ProductSearchPage/>}
          />
          <Route
            path="/category/:categoryId"
            exact
            element={< CategoryPage/>}
          />
          <Route
            path="/product/:productId"
            exact
            element={< ProductDetailPage/>}
          />

    {/* admin */}
          {/* <Route
            path="/admin/user"
            exact
            element= {<AdminDashboardPage/>}
          />  */}
          <Route
            path="/admin/user"
            exact
            element= {<AdminUserPage/>}
          />
          <Route
            path="/admin/category"
            exact
            element={<AdminCategoryPage/>}
          />
          <Route
            path="/admin/category/createNewCategory"
            exact
            element = {<AdminCreateCategoryPage/>}
          />
          <Route
            path="/admin/category/editCategory/:categoryId"
            exact
            element = {<AdminEditCategoryPage/>}
          />
          <Route
            path="/admin/product"
            exact
            element={<AdminProductPage/>}
          />
    {/* account */}
          <Route
            path="/account/profile"
            exact
            element={<ProfilePage/>}
          />
          <Route
            path="/account/addresses"
            exact
            element= {<AddressesPage/>}
          />
          {/* <Route
            path="/account/purchase/detail/:orderId"
            exact
            element={<OrderDetailPage/>}
          /> */}

          <Route
            path="/account/following"
            exact
            element ={<FollowingPage/>}
          />
          <Route
            path="/change/password/:passwordCode"
            exact
            element={<ChangePasswordPage/>}
          />
          <Route path="/cart" exact element={<CartPage/>} />
          {/* <Route
            path="/account/purchase"
            exact
            component={<PurchasePage/>}
          /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
