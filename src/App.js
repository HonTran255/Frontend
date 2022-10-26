import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from './components/route/PrivateRoute';
import AdminRoute from './components/route/AdminRoute';

//core
import HomePage from './pages/core/HomePage';
import ProductSearchPage from "./pages/core/ProductSearchPage";
import CategoryPage from "./pages/core/CategoryPage";
import ProductDetailPage from "./pages/product/DetailPage";

//admin
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminUserPage from './pages/admin/UserPage';
import AdminCategoryPage from './pages/admin/CategoryPage';
import AdminCreateCategoryPage from './pages/admin/CreateCategoryPage';
import AdminEditCategoryPage from './pages/admin/EditCategoryPage';
import AdminProductPage from './pages/admin/ProductPage'
import AdminCreateProductPage from './pages/admin/CreateProductPage';
import AdminEditProductPage from './pages/admin/EditProductPage';
import AdminOrderPage from './pages/admin/OrderPage';
import AdminOrderDetailPage from './pages/admin/OrderDetailPage';
import AdminDeliveryPage from './pages/admin/DeliveryPage';

//account
import ProfilePage from "./pages/account/ProfilePage";
import AddressesPage from "./pages/account/AddressesPage";
import FollowingPage from "./pages/account/FollowingPage"; 
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
import PurchasePage from "./pages/account/PurchasePage";
import CartPage from "./pages/account/CartPage";
import OrderDetailPage from "./pages/account/OrderDetailPage";


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
          <Route
            path="/admin/dashboard"
            exact
            element= {<AdminDashboardPage/>}
          /> 
          <Route
            path="/admin/user"
            exact
            element= {
              <AdminRoute>
                <AdminUserPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category"
            exact
            element= {
              <AdminRoute>
                <AdminCategoryPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category/createNewCategory"
            exact
            element= {
              <AdminRoute>
                <AdminCreateCategoryPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category/editCategory/:categoryId"
            exact
            element= {
              <AdminRoute>
                <AdminEditCategoryPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product"
            exact
            element= {
              <AdminRoute>
                <AdminProductPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/createNewProduct"
            exact
            element= {
              <AdminRoute>
                <AdminCreateProductPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/editProduct/:productId"
            exact
            element= {
              <AdminRoute>
                <AdminEditProductPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/order"
            exact
            element= {
              <AdminRoute>
                <AdminOrderPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/order/detail/:orderId"
            exact
            element= {
              <AdminRoute>
                <AdminOrderDetailPage/>
              </AdminRoute>
            }
          />
                    <Route
            path="/admin/delivery"
            exact
            element= {
              <AdminRoute>
                <AdminDeliveryPage/>
              </AdminRoute>
            }
          />
    {/* account */}
          <Route
            path="/account/profile"
            exact
            element={
              <PrivateRoute>
                <ProfilePage/>
              </PrivateRoute>
          }
          />
          <Route
            path="/account/addresses"
            exact
            element={
              <PrivateRoute>
                <AddressesPage/>
              </PrivateRoute>
          }
          />
          <Route
            path="/account/purchase"
            exact
            element=
            { <PrivateRoute>
                <PurchasePage/>
              </PrivateRoute>
            }
          /> 
          
          <Route
            path="/account/purchase/detail/:orderId"
            exact
            element=
            { <PrivateRoute>
                <OrderDetailPage/>
              </PrivateRoute>
            }
          />

          <Route
            path="/account/following"
            exact
            element={
              <PrivateRoute>
                <FollowingPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/change/password/:passwordCode"
            exact
            element={
              <PrivateRoute>
                <ChangePasswordPage/>
              </PrivateRoute>
            }
          />
          <Route path="/cart" exact 
              element={
                <PrivateRoute>
                  <CartPage/>
                </PrivateRoute>
              }
          />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
