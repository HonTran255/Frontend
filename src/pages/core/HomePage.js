import MainLayout from '../../components/layout/MainLayout';
import ListCategories from '../../components/list/ListCategories';
import Banner from '../../components/ui/Banner';
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct';

const HomePage = () => {
    return (
        <MainLayout container="container-lg" navFor="user">
            <div className="mb-4">
                <Banner/>
            </div>
            <div className="mb-4">
                <ListCategories heading="Danh mục" />
            </div>

            <div className="mb-4">
                <ListBestSellerProduct heading="Best Seller" />
            </div>

        </MainLayout>
    );
};

export default HomePage; 
