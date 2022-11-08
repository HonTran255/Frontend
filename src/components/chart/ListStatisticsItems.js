import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listOrdersForAdmin} from '../../apis/order';
import {
    listProductsForAdmin,
} from '../../apis/product';
import { listUserForAdmin } from '../../apis/user';
import { groupByDate, groupByJoined, groupBySold } from '../../helpers/groupBy';
import { humanReadableDate } from '../../helpers/humanReadable';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import DropDownMenu from '../ui/DropDownMenu';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import UserSmallCard from '../card/UserSmallCard';
import ProductSmallCard from '../card/ProductSmallCard';
import { PDFExport } from "@progress/kendo-react-pdf";
import { formatPrice } from '../../helpers/formatPrice';


const groupByFunc = {
    order: groupByDate,
    product: groupBySold,
    user: groupByJoined
};

const titles = {
    order: 'Số tiền',
    product: 'Sản phẩm bán được',
    user: 'Khách hàng mới'
};

const ListStatisticsItems = ({ by = 'admin'}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [items, setItems] = useState({
        order: [],
        product: [],
        user: [],
    });
    const [sizes, setSizes] = useState({
        order: 0,
        product: 0,
        user: 0,
    });
    const [options, setOptions] = useState({
        flag: 'order',
        by: 'hours',
        sliceEnd: 6,
        type: 'line',
    });

    const { _id, accessToken } = getToken();
    const pdfExportComponent = useRef(null);
    const adminInit = async () => {
        setError('');
        setIsLoading(true);
        try {
            const orderData = await listOrdersForAdmin(_id, accessToken, {
                search: '',
                limit: 1000,
                sortBy: 'createdAt',
                order: 'desc',
                page: 1,
                status: '3',
            });

            const productData = await listProductsForAdmin(_id, accessToken, {
                search: '',
                sortBy: 'sold',
                isActive: 'true',
                order: 'desc',
                limit: 1000,
                page: 1,
            });

            const userData = await listUserForAdmin(_id, accessToken, {
                search: '',
                order: 'desc',
                limit: 1000,
                page: 1,
                role: 'user',
            });

            setItems({
                ...items,
                order: orderData.orders.reverse(),
                product: productData.products,
                user: userData.users,
            });

            setSizes({
                ...sizes,
                order: orderData.size,
                product: productData.size,
                user: userData.size,
            });
        } catch (e) {
            setError('Server Error');
        }

        setIsLoading(false);
    };
    useEffect(() => {
        adminInit();
    }, [by]);

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            <div className="container-fluid px-2">

                <div className="row">
                    {by === 'admin' && (
                        <>
                            <div className="col-md-3 col-6">
                                <button
                                    type="button"
                                    className={`btn ${
                                        options.flag === 'user'
                                            ? 'btn-funny'
                                            : 'btn-outline-funny'
                                    } btn-lg ripple w-100 py-4 mb-2`}
                                    onClick={() =>
                                        setOptions({
                                            ...options,
                                            flag: 'user',
                                        })
                                    }
                                >
                                    <i className="fas fa-user-friends"></i>
                                    <span className="ms-3 res-hide">
                                        {sizes.user}
                                    </span>
                                    <span className="ms-1 res-hide-lg">
                                        Khách hàng
                                    </span>
                                </button>
                            </div>
                        </>
                    )}

                    <div className="col-md-3 col-6">
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'product'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            } btn-lg ripple w-100 py-4 mb-2`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'product',
                                })
                            }
                        >
                            <i className="fas fa-box"></i>
                            <span className="ms-3 res-hide">
                                {sizes.product}
                            </span>
                            <span className="ms-1 res-hide-lg">Sản phẩm</span>
                        </button>
                    </div>

                    <div className="col-md-3 col-6">
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'order'
                                    ? 'btn-pink'
                                    : 'btn-outline-pink'
                            } btn-lg ripple w-100 py-4 mb-2`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'order',
                                })
                            }
                        >
                            <i className="fas fa-clipboard"></i>
                            <span className="ms-3 res-hide">{sizes.order}</span>
                            <span className="ms-1 res-hide-lg">Đơn hàng</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-2">
                <div className="row">

                    <div className="col-xl-8 col-lg-6">
                        <form className="d-flex">
                            {options.flag !== 'product' ? (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: 'Giờ',
                                                value: 'hours',
                                                icon: (
                                                    <i className="far fa-clock"></i>
                                                ),
                                            },
                                            {
                                                label: 'Ngày',
                                                value: 'date',
                                                icon: (
                                                    <i className="fas fa-calendar-day"></i>
                                                ),
                                            },
                                            {
                                                label: 'Tháng',
                                                value: 'month',
                                                icon: (
                                                    <i className="fas fa-calendar-alt"></i>
                                                ),
                                            },
                                            {
                                                label: 'Năm',
                                                value: 'year',
                                                icon: (
                                                    <i className="fas fa-calendar-minus"></i>
                                                ),
                                            },
                                        ]}
                                        value={options.by}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                by: value,
                                            })
                                        }
                                        label="Thống kê theo"
                                        borderBtn={true}
                                    />
                                </div>
                            ) : (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: '6 sản phẩm',
                                                value: 6,
                                            },
                                            {
                                                label: '10 sản phẩm',
                                                value: 10,
                                            },
                                            {
                                                label: '50 sản phẩm',
                                                value: 50,
                                            },
                                            {
                                                label: '100 sản phẩm',
                                                value: 100,
                                            },
                                        ]}
                                        value={options.sliceEnd}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                sliceEnd: value,
                                            })
                                        }
                                        label="Thống kê theo"
                                        borderBtn={true}
                                    />
                                </div>
                            )}
                            <div>
                                <DropDownMenu
                                    listItem={[
                                        {
                                            label: 'Line',
                                            value: 'line',
                                            icon: (
                                                <i className="fas fa-chart-line"></i>
                                            ),
                                        },
                                        {
                                            label: 'Bar',
                                            value: 'bar',
                                            icon: (
                                                <i className="fas fa-chart-bar"></i>
                                            ),
                                        },
                                        {
                                            label: 'Doughnut',
                                            value: 'doughnut',
                                            icon: (
                                                <i className="fas fa-chart-pie"></i>
                                            ),
                                        },
                                    ]}
                                    value={options.type}
                                    setValue={(value) =>
                                        setOptions({
                                            ...options,
                                            type: value,
                                        })
                                    }
                                    label="Biểu đồ"
                                    borderBtn={true}
                                />
                            </div>

                        </form>
                        <div className="example-config">
                            <button
                            className="exportPDF"
                            onClick={() => {
                                if (pdfExportComponent.current) {
                                pdfExportComponent.current.save();
                                }
                            }}
                            >
                                Xuất file báo cáo
                            </button>
                        </div>
                        <div className="mt-2">
                            {options.type === 'line' && (
                                <LineChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'bar' && (
                                <BarChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'doughnut' && (
                                <DoughnutChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 mt-4">
                        <h4 className="text-center my-4">
                            Top 6 {options.flag}s
                        </h4>
                        <div className="table-scroll my-2">
                            <table className="table align-middle table-hover table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            {options.flag[0].toUpperCase() +
                                                options.flag.substring(1)}
                                        </th>
                                        <th scope="col">
                                            {options.flag === 'product' &&
                                                'Sold'}
                                            {options.flag === 'order' && 'Date'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {((options.flag === 'order') ?
                                        items[options.flag].slice(-6).reverse() :
                                        items[options.flag].slice(0,6))
                                        .map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td
                                                    className="text-start"
                                                    style={{
                                                        whiteSpace: 'normal',
                                                    }}
                                                >
                                                    {options.flag ===
                                                        'user' && (
                                                        <UserSmallCard
                                                            user={item}
                                                        />
                                                    )}

                                                    {options.flag ===
                                                        'product' && (
                                                        <ProductSmallCard
                                                            product={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {item._id}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    {options.flag ===
                                                        'product' && item.sold}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {humanReadableDate(
                                                                item.createdAt,
                                                            )}
                                                        </small>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end my-2">
                            <Link
                                to={`/${by}/${
                                    by === 'admin'
                                        ? options.flag
                                        : options.flag + 's/' 
                                }`}
                                className="link-hover"
                            >
                                <span className="me-2 res-hide">
                                    Trở về
                                </span>
                                <i className="fas fa-external-link-alt"></i>
                            </Link>
                        </div>
                    </div>
                
                </div>
            </div>
        {/* --------------------------------Export file PDF------------------------------------------ */}

        <div
            style={{
            position: "absolute",
            left: "-1000px",
            top: 0,
            }}
        >
            <PDFExport paperSize="auto" margin="1cm" ref={pdfExportComponent}>
            <div
                style={{
                width: "500px",
                }}
            >
                <meta charset="utf-8"></meta>
                <h4 className="text-center text-uppercase">Báo cáo doanh thu</h4>
                <DoughnutChart
                    by={options.by}
                    items={items[options.flag]}
                    groupBy={groupByFunc[options.flag]}
                    title={titles[options.flag]}
                    sliceEnd={options.sliceEnd}
                />

            </div>
            <div className="table-scroll my-2">
                            <table className="table align-middle table-hover table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            {options.flag[0].toUpperCase() +
                                                options.flag.substring(1)}
                                        </th>
                                        <th scope="col">
                                            {options.flag === 'product' &&
                                                'Sold'}
                                            {options.flag === 'order' && 'Date'}
                                        </th>
                                        <th scope="col">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {((options.flag === 'order') ?
                                        items[options.flag].slice(-6).reverse() :
                                        items[options.flag].slice(0,6))
                                        .map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td
                                                    className="text-start"
                                                    style={{
                                                        whiteSpace: 'normal',
                                                    }}
                                                >
                                                    {options.flag ===
                                                        'user' && (
                                                        <UserSmallCard
                                                            user={item}
                                                        />
                                                    )}

                                                    {options.flag ===
                                                        'product' && (
                                                        <ProductSmallCard
                                                            product={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {item._id}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    {options.flag ===
                                                        'product' && item.sold}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {humanReadableDate(
                                                                item.createdAt,
                                                            )}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    <small>         
                                                    {item.amount &&
                                            formatPrice(
                                                item.amount
                                                    .$numberDecimal,
                                            )}{' '}
                                        VND
                                                    </small>     
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
            </PDFExport>
        </div>
    </div>
    );
};

export default ListStatisticsItems;
