import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminEditProductForm from '../../components/item/form/AdminEditProductForm';

const EditProductPage = () => {
    const user = useSelector((state) => state.account.user);
    const { productId } = useParams();

    return (
        <AdminLayout user={user}>
            <AdminEditProductForm productId={productId} />
        </AdminLayout>
    );
};

export default EditProductPage;