import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { getProduct } from '../../../apis/product';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';
import AdminEditProductProfileForm from './AdminEditProductProfileForm';
import AdminEditProductImagesForm from './AdminEditProductImagesForm';

const AdminEditProductForm = ({productId = ''}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [product, setProduct] = useState({});

    const init = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setIsLoading(true);
        getProduct(productId, _id, accessToken)
            .then((data) => {
                if (data.error) setError(data.error);
                else setProduct(data.product);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [productId, run]);

    return (
        <div className="p-1 position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="mb-4">
                <AdminEditProductImagesForm
                    product={product}
                    onRun={() => setRun(!run)}
                />
            </div>

            <div className="mb-4">
                <AdminEditProductProfileForm
                    product={product}
                />
            </div>

            <div className="">
                <Link
                    to={`/admin/product`}
                    className="text-decoration-none cus-link-hover"
                >
                    <i className="fas fa-arrow-circle-left"></i> Trở về
                </Link>
            </div>
        </div>
    );
};

export default AdminEditProductForm;
