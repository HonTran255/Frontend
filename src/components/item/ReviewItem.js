import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { checkReview } from '../../apis/review';
import Loading from '../ui/Loading';
import Modal from '../ui/Modal';
import ReviewForm from './form/ReviewForm';

const ReviewItem = ({
    orderId = '',
    productId = '',
    detail = true,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);

    const init = () => {
        const { _id, accessToken } = getToken();
        setIsLoading(true);
        checkReview(_id, accessToken, { orderId, productId })
            .then((data) => {
                if (data.success) setIsReviewed(true);
                else setIsReviewed(false);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsReviewed(false);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [orderId, productId]);

    return (
        <div className="review-item position-relative d-inline-block">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="cus-tooltip">
                        <button
                            type="button"
                            disabled={isReviewed}
                            className="btn btn-primary ripple text-nowrap"
                            data-bs-toggle="modal"
                            data-bs-target="#review-form"
                        >
                            <i className="fas fa-comment-dots"></i>
                            {detail && (
                                <span className="ms-2 res-hide-lg">
                                    Đánh giá và bình luận
                                </span>
                            )}
                        </button>

                        {!isReviewed && (
                            <Modal
                                id="review-form"
                                hasCloseBtn={false}
                                title="Đánh giá và bình luận"
                            >
                                <ReviewForm
                                    orderId={orderId}
                                    productId={productId}
                                    onRun={() => setIsReviewed(true)}
                                />
                            </Modal>
                        )}
                    </div>

                    {isReviewed && (
                        <small className="cus-tooltip-msg">
                            The product has been reviewed & rated
                        </small>
                    )}
                </>
            )}
        </div>
    );
};

export default ReviewItem;
