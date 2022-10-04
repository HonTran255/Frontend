import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { addToCart } from '../../../apis/cart';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';

const AddToCartForm = ({ product = {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [updateDispatch] = useUpdateDispatch();

    const [cartItem, setCartItem] = useState({});

    useEffect(() => {
        let defaultList = [];
        setCartItem({
            productId: product._id,
            count: 1,
        });
    }, [product]);

    const handleSet = (values) => {
        setCartItem({
            ...cartItem,
            styleValueIds: values.map((value) => value._id).join('|'),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        addToCart(_id, accessToken, cartItem)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    setSuccess(data.success);
                    updateDispatch('account', data.user);
                }
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
                setIsLoading(false);
            });
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}

            {isConfirming && (
                <ConfirmDialog
                    title="Add to cart"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form className="add-to-cart-form row">

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12">
                        <Success msg={success} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple btn-lg"
                        onClick={handleSubmit}
                    >
                        <i className="fas fa-cart-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddToCartForm;
