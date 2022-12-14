import { useSelector } from 'react-redux';
import useToggle from '../../hooks/useToggle';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductsTable from '../../components/table/AdminProductsTable';
import AdminCreateProductForm from '../../components/item/form/AdminCreateProductForm';

const ProductPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const [flag, toggleFlag] = useToggle(true);

    return (

        <AdminLayout user={user}>
            <AdminProductsTable isActive={flag} />
        </AdminLayout>

    );
};

export default ProductPage;
