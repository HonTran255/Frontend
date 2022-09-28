import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../reducers/product';
import { countOrder } from '../apis/order';
import { getCartCount } from '../apis/cart';
import { getToken } from '../apis/auth';
import {addUser} from '../reducers/user';
import {addAccount} from '../reducers/account';

const useUpdateDispatch = () => {
    const account = useSelector((state) => state.account.user);

    const user = useSelector((state) => state.user.user);

    const { _id, accessToken } = getToken();

    const dispatch = useDispatch();

    const updateDispatch = async (name, data) => {
        switch (name) {
            case 'account': {
                //get count carts
                try {
                    const res = await getCartCount(_id, accessToken);
                    data.cartCount = res.count;
                } catch {
                    data.cartCount = account.cartCount;
                }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', _id, '');
                    const res2 = await countOrder('Cancelled', _id, '');
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders =
                        account.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = account.numberOfFailedOrders;
                }
                return dispatch(addAccount(data));
            }

            case 'user': {
                // //get level
                // try {
                //     const res = await getUserLevel(data._id);
                //     data.level = res.level;
                // } catch {
                //     data.level = user.level;
                // }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', data._id, '');
                    const res2 = await countOrder('Cancelled', data._id, '');
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders = user.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = user.numberOfFailedOrders;
                }

                return dispatch(addUser(data));
            }

            case 'product': {
                //
                return dispatch(addProduct(data));
            }
            default: 
        }
    };

    return [updateDispatch];
};

export default useUpdateDispatch;
