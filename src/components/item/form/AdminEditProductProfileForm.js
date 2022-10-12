import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { updateProduct } from '../../../apis/product';
import { regexTest, numberTest } from '../../../helpers/test';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import Loading from '../../ui/Loading';
import ConfirmDialog from '../../ui/ConfirmDialog';
import CategorySelector from '../../selector/CategorySelector';
import ProducerSelector from '../../selector/ProducerSelector';


const AdminEditProductProfileForm = ({product = {}}) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [newProduct, setNewProduct] = useState({});

    const { _id, accessToken } = getToken();
console.log(product.name);
    useEffect(() => {
        setNewProduct({
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            price: product.price && product.price.$numberDecimal,
            promotionalPrice:
                product.promotionalPrice &&
                product.promotionalPrice.$numberDecimal,
            categoryId: product.categoryId && product.categoryId._id,
            producerId: product.producerId && product.producerId._id,
            defaultCategory: product.categoryId,
            defaultProducer: product.producerId,
            isValidName: true,
            isValidDescription: true,
            isValidQuantity: true,
            isValidPrice: true,
            isValidPromotionalPrice: true,
        });

    }, [product]);

    const handleChange = (name, isValidName, value) => {
        setNewProduct({
            ...newProduct,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setNewProduct({
            ...newProduct,
            [isValidName]: flag,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            quantity,
            price,
            promotionalPrice,
            categoryId,
            producerId,
        } = newProduct;
        if (
            !name ||
            !description ||
            !quantity ||
            !price ||
            !promotionalPrice ||
            !categoryId ||
            !producerId
        ) {
            setNewProduct({
                ...newProduct,
                isValidName: regexTest('anything', name),
                isValidDescription: regexTest('bio', description),
                isValidQuantity: numberTest('positive|zero', quantity),
                isValidPrice: numberTest('positive|zero', price),
                promotionalPrice: numberTest('positive|zero', promotionalPrice),
            });
            return;
        }

        const {
            isValidName,
            isValidDescription,
            isValidQuantity,
            isValidPrice,
            isValidPromotionalPrice,
        } = newProduct;
        if (
            !isValidName ||
            !isValidDescription ||
            !isValidQuantity ||
            !isValidPrice ||
            !isValidPromotionalPrice
        )
            return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const formData = new FormData();
        formData.set('name', newProduct.name);
        formData.set('description', newProduct.description);
        formData.set('quantity', newProduct.quantity);
        formData.set('price', newProduct.price);
        formData.set('promotionalPrice', newProduct.promotionalPrice);
        formData.set('categoryId', newProduct.categoryId);
        formData.set('producerId', newProduct.producerId);

        setError('');
        setSuccess('');
        setIsLoading(true);
        updateProduct(_id, accessToken, formData, product._id)
            .then((data) => {
                if (data.error) setError(data.error);
                else setSuccess(data.success);
                setIsLoading(false);
                setTimeout(() => {
                    setSuccess('');
                    setError('');
                }, 3000);
            })
            .catch((error) => {
                setError('Sever error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Edit product information"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form
                className="border border-primary rounded-3 row mb-2"
                onSubmit={handleSubmit}
            >
                <div className="col-12 bg-primary p-3">
                    <h1 className="text-white fs-5 m-0">
                        Sửa thông tin sản phẩm
                    </h1>
                </div>

                <div className="col-12 px-4">
                    <Input
                        type="text"
                        label="Product name"
                        value={newProduct.name}
                        isValid={newProduct.isValidName}
                        feedback="Please provide a valid product name."
                        validator="anything"
                        onChange={(value) =>
                            handleChange('name', 'isValidName', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidName', flag)
                        }
                    />
                </div>

                <div className="col-12 px-4">
                    <TextArea
                        type="text"
                        label="Description"
                        value={newProduct.description}
                        isValid={newProduct.isValidDescription}
                        feedback="Please provide a valid product description."
                        validator="bio"
                        onChange={(value) =>
                            handleChange(
                                'description',
                                'isValidDescription',
                                value,
                            )
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidDescription', flag)
                        }
                    />
                </div>

                <div className="col-12 px-4">
                    <Input
                        type="number"
                        label="Quantity"
                        value={newProduct.quantity}
                        isValid={newProduct.isValidQuantity}
                        feedback="Please provide a valid product quantity."
                        validator="positive|zero"
                        onChange={(value) =>
                            handleChange('quantity', 'isValidQuantity', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidQuantity', flag)
                        }
                    />
                </div>

                <div className="col-12 px-4">
                    <Input
                        type="number"
                        label="Price (VND)"
                        value={newProduct.price}
                        isValid={newProduct.isValidPrice}
                        feedback="Please provide a valid product price."
                        validator="positive|zero"
                        onChange={(value) =>
                            handleChange('price', 'isValidPrice', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidPrice', flag)
                        }
                    />
                </div>

                <div className="col-12 px-4">
                    <Input
                        type="number"
                        label="Promotional price (VND)"
                        value={newProduct.promotionalPrice}
                        isValid={newProduct.isValidPromotionalPrice}
                        feedback="Please provide a valid product promotional price."
                        validator="positive|zero"
                        onChange={(value) =>
                            handleChange(
                                'promotionalPrice',
                                'isValidPromotionalPrice',
                                value,
                            )
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidPromotionalPrice', flag)
                        }
                    />
                </div>

                <div className="col-12 mt-5 px-4">
                    <p className="">Chọn danh mục</p>
                    <CategorySelector
                        label="Choosed category"
                        defaultValue={newProduct.defaultCategory}
                        isActive={true}
                        isRequired={true}
                        selected= "parent"
                        onSet={(category) =>
                            setNewProduct({
                                ...newProduct,
                                categoryId: category._id,
                            })
                        }
                    />
                </div>

                <div className="col-12 mt-5 px-4">
                    <p className="">Chọn nhà sản xuất</p>
                    <ProducerSelector
                        label="Chọn nhà sản xuất"
                        defaultValue={newProduct.defaultProducer}
                        isActive={true}
                        isRequired={true}
                        onSet={(producer) =>
                            setNewProduct({
                                ...newProduct,
                                producerId: producer._id,
                            })
                        }
                    />
                </div>

                {error && (
                    <div className="col-12 px-4">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12 px-4">
                        <Success msg={success} />
                    </div>
                )}
                <div className="col-12 px-4 pb-3 d-flex justify-content-end align-items-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple res-w-100-md"
                        onClick={handleSubmit}
                        style={{ width: '40%' }}
                    >
                        Sửa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditProductProfileForm;
