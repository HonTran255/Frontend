import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { Link } from 'react-router-dom';
import {
    listProductsForAdmin,
    activeProduct as activeOrInactive,
} from '../../apis/product';
import { humanReadableDate } from '../../helpers/humanReadable';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import ProductStatusLabel from '../label/ProductStatusLabel';
import StarRating from '../label/StarRating';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ConfirmDialog from '../ui/ConfirmDialog';
import CategorySmallCard from '../card/CategorySmallCard';
import { formatPrice } from '../../helpers/formatPrice';

const IMG = process.env.REACT_APP_STATIC_URL;

const AdminProductsTable = ({ heading = true, isActive = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState('');

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        isActive,
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const [activeProduct, setActiveProduct] = useState({});

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listProductsForAdmin(_id, accessToken, filter)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    setProducts(data.products);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [filter, run]);

    useEffect(() => {
        setFilter({
            ...filter,
            isActive,
        });
    }, [isActive]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    };

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };


    const handleActiveProduct = (product) => {
        setActiveProduct(product);
        setIsConfirming(true);
    };

    const onSubmit = () => {
        setError('');
        setIsLoading(true);
        const value = { isActive: !activeProduct.isActive };
        activeOrInactive(_id, accessToken, value, activeProduct._id)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else setRun(!run);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <Link
                            type="button"
                            className="btn btn-primary ripple text-nowrap"
                            to="/admin/product/createNewProduct"
                        >
                            <i className="fas fa-plus-circle"></i>
                            <span className="ms-2 res-hide">Add Product</span>
                        </Link>
                    </div>
                </div>
                <span className="me-2 text-nowrap res-hide">
                    {pagination.size || 0} kết quả
                </span>
            </div>

            <div className="table-scroll my-2">
                <table className="table align-middle table-hover table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Sản phẩm"
                                    sortBy="name"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Hình ảnh"
                                    sortBy="listImages"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Hình ảnh khác"
                                    sortBy="listImages"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Mô tả"
                                    sortBy="description"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Giá"
                                    sortBy="price"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Giá khuyến mãi"
                                    sortBy="promotionalPrice"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Số lượng"
                                    sortBy="quantity"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Đã bán"
                                    sortBy="sold"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Category"
                                    sortBy="categoryId"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Đánh giá"
                                    sortBy="rating"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Trạng thái"
                                    sortBy="isActive"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Thời gian"
                                    sortBy="createdAt"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    {index +
                                        1 +
                                        (filter.page - 1) * filter.limit}
                                </th>
                                <td style={{ whiteSpace: 'normal' }}>
                                    <small>{product.name}</small>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            position: 'relative',
                                            paddingBottom: '72px',
                                            width: '72px',
                                            height: '0',
                                        }}
                                    >
                                        <img
                                            src={IMG + product.listImages[0]}
                                            alt={product.name}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                top: '0',
                                                left: '0',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="d-flex justify-content-between align-items-start"
                                        style={{
                                            width: '300px',
                                            height: '200px',
                                            overflow: 'auto',
                                        }}
                                    >
                                        {product.listImages.length > 1 ? (
                                            product.listImages.map(
                                                (image, index) => {
                                                    if (index === 0) return;

                                                    return (
                                                        <div
                                                            className="position-relative mx-auto"
                                                            key={index}
                                                            style={{
                                                                paddingBottom:
                                                                    '72px',
                                                                width: '72px',
                                                                height: '0',
                                                            }}
                                                        >
                                                            <img
                                                                className="position-absolute"
                                                                src={
                                                                    IMG + image
                                                                }
                                                                alt="other images"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    top: '0',
                                                                    left: '0',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <small className="mx-auto">
                                               Không có hình ảnh khác
                                            </small>
                                        )}
                                    </div>
                                </td>
                                <td style={{ whiteSpace: 'normal' }}>
                                    <div
                                        style={{
                                            width: '300px',
                                            maxHeight: '200px',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <small>{product.description}</small>
                                    </div>
                                </td>
                                <td>
                                    <small>
                                        {product.price &&
                                            formatPrice(
                                                product.price.$numberDecimal,
                                            )}
                                        VND
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {product.promotionalPrice &&
                                            formatPrice(
                                                product.promotionalPrice
                                                    .$numberDecimal,
                                            )}
                                        VND
                                    </small>
                                </td>
                                <td>
                                    <small>{product.quantity}</small>
                                </td>
                                <td>
                                    <small>{product.sold}</small>
                                </td>
                                <td
                                    style={{
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    <div style={{ width: '200px' }}>
                                        {/* <CategorySmallCard
                                            category={product.categoryId}
                                        /> */}
                                        cate
                                    </div>
                                </td>
                                <td>
                                    <small>
                                        <StarRating stars={product.rating} />
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        <ProductStatusLabel
                                            isActive={product.isActive}
                                        />
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {humanReadableDate(product.createdAt)}
                                    </small>
                                </td>
                                <td>
                                    <Link
                                        type="button"
                                        className="btn btn-primary ripple me-2"
                                        to={`/admin/product/editProduct/${product._id}`}
                                    >
                                        <i className="fas fa-pen"></i>
                                        <span className="ms-2 res-hide">
                                            Sửa
                                        </span>
                                    </Link>

                                    {!product.isDeleted ? (
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            // onClick={() =>
                                            //     handleDeleteCategory(category)
                                            // }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                            <span className="ms-2 res-hide">
                                                Xóa
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ripple cus-tooltip"
                                            // onClick={() =>
                                            //     handleRestoreCategory(category)
                                            // }
                                        >
                                            <i className="fas fa-trash-restore-alt"></i>
                                            <span className="ms-2 res-hide">
                                                Hoàn
                                            </span>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination.size !== 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    
    );
};

export default AdminProductsTable;
