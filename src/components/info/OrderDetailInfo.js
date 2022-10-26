import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import {
    getOrderByUser,
    getOrderForAdmin,
} from '../../apis/order';
import { humanReadableDate } from '../../helpers/humanReadable';
import { formatPrice } from '../../helpers/formatPrice';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import OrderStatusLabel from '../label/OrderStatusLabel';
import Paragraph from '../ui/Paragraph';
import UserSmallCard from '../card/UserSmallCard';
import ListOrderItems from '../list/ListOrderItems';
import AdminUpdateOrderStatus from '../button/AdminUpdateOrderStatus';
import UserCancelOrderButton from '../button/UserCancelOrderButton';

const OrderDetailInfo = ({
    orderId = '',
    by = 'user',
    isEditable = false,
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [run, setRun] = useState(false);
    const [error, setError] = useState('');

    const [order, setOrder] = useState({});

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        if (by === 'admin')
            getOrderForAdmin(_id, accessToken, orderId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setOrder(data.order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        else
            getOrderByUser(_id, accessToken, orderId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setOrder(data.order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
    };

    useEffect(() => {
        init();
    }, [orderId, by, run]);

    return (
        <div className="position-relative">
            {isloading && <Loading />}

            <div className="d-flex flex-wrap justify-content-start align-items-center">
                <h4 className="mx-4">Order #{order._id}</h4>

                {(!isEditable ||
                    (isEditable &&
                        by === 'admin' &&
                        order.status !== '2')) && (
                    <span className="fs-6 mx-4 mb-2">
                        <OrderStatusLabel status={order.status} />
                    </span>
                )}

                {by === 'user' && order.status === '0' && (
                    <div className="mx-4 mb-2">
                        <UserCancelOrderButton
                            orderId={order._id}
                            status={order.status}
                            detail={true}
                            createdAt={order.createdAt}
                            onRun={() => setRun(!run)}
                        />
                    </div>
                )}
                {isEditable && by === 'admin' &&  order.status !== '4' &&(
                    <div className="mx-4 mb-2">
                        <AdminUpdateOrderStatus                        
                            orderId={orderId}
                            status={order.status}
                            onRun={() => setRun(!run)}
                        />
                    </div>
                )}
            </div>

            {error && <Error msg={error} />}

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <div className="col-sm-6">
                        <Paragraph
                            label="Tạo lúc"
                            value={humanReadableDate(order.createdAt)}
                        />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <div className="col-sm-6">
                        <Paragraph
                            label="Người nhận"
                            value={<UserSmallCard user={order.userId} />}
                        />
                    </div>

                    <div className="col-sm-6">
                        <Paragraph label="Số điện thoại" value={order.phone} />
                    </div>

                    <div className="col-12">
                        <Paragraph label="Đến địa chỉ" value={order.address} />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                {order.deliveryId && (
                        <div className="col-12">
                            <Paragraph
                                label="Đơn vị vận chuyển"
                                value={
                                    <span>
                                        {order.deliveryId.name} -{' '}
                                        {order.deliveryId.price.$numberDecimal}{' '}
                                        VND
                                    </span>
                                }
                            />
                        </div>
                    )}
                    

                    <div className="col-12">
                        <Paragraph
                            label="Phương thức thanh toán"
                            value={
                                order.isPaidBefore
                                    ? 'Thanh toán online'
                                    : 'Thanh toán trực tiếp'
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <ListOrderItems
                        orderId={orderId}
                        by={by}
                        status={order.status}
                    />

                    <div className="col-12 mt-2 d-flex justify-content-end">
                        <div className="me-4">
                            <Paragraph
                                label="Tổng tiền thanh toán"
                                value={
                                    <span className="text-primary fw-bold fs-5">
                                        {formatPrice(
                                            order.amount &&
                                                order.amount
                                                    .$numberDecimal,
                                        )}{' '}
                                        VND
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailInfo;
