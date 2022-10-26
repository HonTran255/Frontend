import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { createOrder } from '../../../apis/order';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { listActiveDeliveries } from '../../../apis/delivery';
import UserAddAddressItem from '../../item/UserAddAddressItem';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';
import { regexTest } from '../../../helpers/test';
import { convertVNDtoUSD } from '../../../helpers/formatPrice';
import {
    totalProducts,
    totalDelivery
} from '../../../helpers/total';
import { formatPrice } from '../../../helpers/formatPrice';
import Logo from '../../layout/menu/Logo';
import Input from '../../ui/Input';
import DropDownMenu from '../../ui/DropDownMenu';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const CheckoutForm = ({
    cartId = '',
    userId = '',
    items = {},
}) => {

    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');

    const [updateDispatch] = useUpdateDispatch();
    const history = useNavigate();
    const {
        addresses,
        phone,
    } = useSelector((state) => state.account.user);
  
    const [order, setOrder] = useState({});
    const [deliveries, setDeliveries] = useState([]);
    const init = async () => {
        try {
            const res = await listActiveDeliveries();

            setDeliveries(res.deliveries);

            const { deliveryPrice} = totalDelivery(
                res.deliveries[0]
            );

            const { totalPrice, totalPromotionalPrice } =
                totalProducts(items);

            setOrder({
                phone,
                address: addresses[0],
                isValidPhone: true,
                cartId,
                delivery: res.deliveries[0],
                deliveryId: res.deliveries[0]._id,
                deliveryPrice,
                totalPrice,
                totalPromotionalPrice,
                amount: parseInt(totalPromotionalPrice)+ parseInt(deliveryPrice)
            });

        } catch (e) {
            setError('Server Error');
        }
    };
const cvAmount = parseFloat(convertVNDtoUSD(order.amount)) 
    useEffect(() => {
        init();
    }, [cartId, userId, items, addresses, phone]);

    const handleChange = (name, isValidName, value) => {
        setOrder({
            ...order,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setOrder({
            ...order,
            [isValidName]: flag,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            cartId,
            deliveryId,
            address,
            phone,
            amount
        } = order;

        if (
            !cartId ||
            !deliveryId ||
            !address ||
            !phone ||
            !amount
        ) {
            setOrder({
                ...order,
                isValidPhone: regexTest('phone', order.phone),
            });
            return;
        }

        if (!order.isValidPhone) return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        const {
            deliveryId,
            phone,
            address,
            amount
        } = order;

        const orderBody = {
            deliveryId,
            phone,
            address,
            amount,
            isPaidBefore: false,
        };

        setError('');
        setIsLoading(true);
        createOrder(_id, accessToken, cartId, orderBody)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    updateDispatch('account', data.user);
                    history('/account/purchase');
                }
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

    // const handlePayPalCreateOrder = (data, actions) => {
    //     const {
    //         cartId,
    //         deliveryId,
    //         address,
    //         phone,
    //         amount
    //     } = order;

    //     if (
    //         !cartId ||
    //         !deliveryId ||
    //         !address ||
    //         !phone ||
    //         !amount
    //     ) {
    //         setOrder({
    //             ...order,
    //             isValidPhone: regexTest('phone', order.phone),
    //         });

    //     }

    //     if (!order.isValidPhone) return;
    //     else{
    //         return actions.order.create({
    //             purchase_units: [
    //                 {
    //                     amount: {
    //                         currency_code: 'USD',
    //                         value: "12",
    //                     },
    //                 },
    //             ],
    //             application_context: {
    //                 shipping_preference: 'NO_SHIPPING',
    //             },
    //         })
    //         .then((orderId) => {
                    
    //             return orderId;
    //         });
    //     }
    // };

    // const handlePayPalApprove = (data, actions) => {
    //     return actions.order.capture().then(function () {
    //         const { _id, accessToken } = getToken();

    //         const {
    //             phone,
    //             address,
    //             deliveryId,
    //             amount
    //         } = order;

    //         const orderBody = {
    //             phone,
    //             address,
    //             deliveryId,
    //             amount,
    //             isPaidBefore: true,
    //         };

    //         setError('');
    //         setIsLoading(true);
    //         createOrder(_id, accessToken, cartId, orderBody)
    //             .then((data) => {
    //                 if (data.error) setError(data.error);
    //                 else {
    //                     updateDispatch('account', data.user);
    //                     history('/account/purchase');
    //                 }
    //                 setIsLoading(false);
    //             })
    //             .catch((error) => {
    //                 setError('Server Error');
    //                 setTimeout(() => {
    //                     setError('');
    //                 }, 3000);
    //                 setIsLoading(false);
    //             });
    //     });
    // };
    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Thanh toán"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form
                className="border border-primary rounded-3 row mb-2"
                onSubmit={handleSubmit}
            >
                <div className="col-12 bg-primary p-3">
                    <Logo />
                    <p className="text-white fw-light">Đặt hàng</p>
                </div>

                <div className="col-xl-8 col-md-6">
                    <div className="row">
                        <div className="col-12 mt-2 d-flex justify-content-between align-items-end">
                            <div className="flex-grow-1">
                                <Input
                                    type="text"
                                    label="Phone"
                                    value={order.phone}
                                    isValid={order.isValidPhone}
                                    feedback="Hãy nhập số điện thoại."
                                    validator="phone"
                                    onChange={(value) =>
                                        handleChange(
                                            'phone',
                                            'isValidPhone',
                                            value,
                                        )
                                    }
                                    onValidate={(flag) =>
                                        handleValidate('isValidPhone', flag)
                                    }
                                />
                            </div>

                            <div className="d-inline-block position-relative ms-4">
                                <div className="d-inline-block cus-tooltip">
                                    <button
                                        className="btn btn-primary ripple"
                                        type="button"
                                        disabled={!!!phone}
                                        onClick={() =>
                                            setOrder({
                                                ...order,
                                                phone: phone,
                                                isValidPhone: true,
                                            })
                                        }
                                    >
                                        <i className="fas fa-phone-square-alt"></i>
                                    </button>
                                </div>
                                <small className="cus-tooltip-msg">
                                    Sử dụng số điện thoại đã đăng ký
                                </small>
                            </div>
                        </div>

                        <div className="col-12 mt-2 d-flex justify-content-between align-items-end">
                            <div className="flex-grow-1">
                                <DropDownMenu
                                    listItem={
                                        addresses &&
                                        addresses.map((a, i) => {
                                            const newA = {
                                                value: a,
                                                label: a,
                                            };
                                            return newA;
                                        })
                                    }
                                    value={order.address}
                                    setValue={(address) =>
                                        setOrder({
                                            ...order,
                                            address: address,
                                        })
                                    }
                                    size="large"
                                    label="Address"
                                />

                                {addresses && addresses.length <= 0 && (
                                    <small
                                        style={{
                                            marginTop: '-20px',
                                            display: 'block',
                                        }}
                                    >
                                        <Error msg="No address to choose, please add your address first!" />
                                    </small>
                                )}
                            </div>
                            <div className="mb-2 ms-4 position-relative">
                                <div className="d-inline-block cus-tooltip">
                                    <UserAddAddressItem
                                        count={addresses && addresses.length}
                                        detail={false}
                                    />
                                </div>
                                <small className="cus-tooltip-msg">
                                    Thêm địa chỉ
                                </small>
                            </div>
                        </div>

                        <div className="col-12 mt-4">
                            {deliveries && deliveries.length > 0 && (
                                <DropDownMenu
                                    listItem={
                                        deliveries &&
                                        deliveries.map((d, i) => {
                                            const newD = {
                                                value: d,
                                                label:
                                                    d.name +
                                                    ' (' +
                                                    d.price.$numberDecimal +
                                                    ' VND)',
                                            };
                                            return newD;
                                        })
                                    }
                                    value={order.delivery}
                                    setValue={(delivery) => {
                                        const {
                                            deliveryPrice
                                        } = totalDelivery(delivery);
                                        setOrder({
                                            ...order,
                                            delivery,
                                            deliveryId: delivery._id,
                                            deliveryPrice,
                                            amount: parseInt(order.totalPromotionalPrice) + parseInt(deliveryPrice)
                                        });
                                    }}
                                    size="large"
                                    label="Đơn vị vận chuyển"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6">
                    <div className="my-2 p-2 border border-primary rounded">
                        <h4 className="text-center">Thông tin thanh toán</h4>
                        <hr />

                        <dl className="row">
                            <dt className="col-sm-3 col-6">Tổng số tiền</dt>
                            <dd className="col-sm-9 col-6">
                                <dl className="row">
                                    <dd className="col-sm-6 res-hide">
                                        <p className="text-decoration-line-through text-muted">
                                            {formatPrice(order.totalPrice)} VND
                                        </p>
                                    </dd>
                                    <dd className="col-sm-6">

                                        <h4 className="text-primary fs-5">
                                            {formatPrice(order.totalPromotionalPrice)}{' '}
                                            VND
                                        </h4>
                                    </dd>
                                </dl>
                            </dd>

                            <dt className="col-sm-3 col-6">Phí vận chuyển</dt>
                            <dd className="col-sm-9 col-6">
                                <dl className="row">
                                    <dd className="col-sm-6 res-hide">
                                        <p className="text-decoration-line-through text-muted">
                                            {formatPrice(60000)}{' '}
                                            VND
                                        </p>
                                    </dd>
                                    <dd className="col-sm-6">
                                        <h4 className="text-primary fs-5">
                                        {formatPrice(order.deliveryPrice)}{' '}
                                            VND
                                        </h4>
                                    </dd>
                                </dl>
                            </dd>

                            <dt className="col-sm-3 col-6">Tổng thanh toán</dt>
                            <dd className="col-sm-9 col-6">
                                <h4 className="text-primary fs-5">
                                    {formatPrice(order.amount)} VND
                                </h4>
                            </dd>
                        </dl>

                        {error && (
                            <div className="my-1">
                                <Error msg={error} />
                            </div>
                        )}

                        <div className="mt-2">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg ripple w-100 mb-1"
                                onClick={handleSubmit}
                            >
                                Thanh toán
                            </button>
                           
                            <div>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": CLIENT_ID
                                    }}
                                >
                                    {/* <PayPalButtons
                                        fundingSource="paypal"
                                        createOrder={(data, actions) =>
                                            handlePayPalCreateOrder(data, actions)
                                        }
                                        onApprove={(data, actions)=>
                                            handlePayPalApprove(data,actions)
                                        }
                                        onError={(err) =>
                                            setError(String(err).slice(0, 300))
                                        }
                                        onCancel={() => setIsLoading(false)}
                                    /> */}
                                    <PayPalButtons
                                        fundingSource="paypal"
                                        createOrder={(data, actions) => {
                                            return actions.order
                                                .create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                currency_code: "USD",
                                                                value: "1",
                                                            }
                                                        },
                                                    ],
                                                })
                                                .then((orderId) => {
                                                    return orderId;
                                                });
                                        }}
                                        onApprove={function (data, actions) {
                                            return actions.order.capture().then(function () {
                                                // Your code here after capture the order
                                                const { _id, accessToken } = getToken();

                                                const {
                                                    phone,
                                                    address,
                                                    deliveryId,
                                                    amount
                                                } = order;
                                    
                                                const orderBody = {
                                                    phone,
                                                    address,
                                                    deliveryId,
                                                    amount,
                                                    isPaidBefore: true,
                                                };
                                                setError('');
                                                setIsLoading(true);
                                                createOrder(_id, accessToken, cartId, orderBody)
                                                    .then((data) => {
                                                        if (data.error) setError(data.error);
                                                        else {
                                                            updateDispatch('account', data.user);
                                                            history('/account/purchase');
                                                        }
                                                        setIsLoading(false);
                                                    })
                                                    .catch((error) => {
                                                        setError('Server Error');
                                                        setTimeout(() => {
                                                            setError('');
                                                        }, 3000);
                                                        setIsLoading(false);
                                                    });
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
