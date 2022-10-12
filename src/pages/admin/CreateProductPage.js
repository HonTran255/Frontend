import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminCreateProductForm from '../../components/item/form/AdminCreateProductForm';

const CreateCategoryPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <AdminCreateProductForm />
        </AdminLayout>
    );
};

export default CreateCategoryPage;
