import UserAvatarUpload from './uploadButton/UserAvatarUpload';
import ProductUpload from './uploadButton/ProductUpload';

const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({
    storeId = '',
    productId = '',
    productIndex = '',
    avatar = '',
    name = '',
    alt = 'avatar',
    bodername = false,
    isEditable = false,
    size = '',
    noRadius = false,
    onRun,
}) => (
    <div className="cus-avatar-wrap">
        <div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
            <div className="cus-avatar">
                <img
                    src={`${IMG + avatar}`}
                    className="cus-avatar-img"
                    style={{ borderRadius: `${noRadius && 'unset'}` }}
                    alt={alt}
                />
                {isEditable === 'user' && <UserAvatarUpload />}
                {isEditable === 'product' && (
                    <ProductUpload
                        productId={productId}
                        index={productIndex}
                        onRun={onRun}
                    />
                )}
            </div>
        </div>

        {size !== 'small' && (
            <h1
                className={`cus-avatar-name m-0 p-1 rounded d-inline-block fs-5 ${
                    bodername && 'bg-body shadow'
                }`}
            >
                {name}
            </h1>
        )}
    </div>
);

export default Avatar;
