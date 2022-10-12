import { Link } from 'react-router-dom';
const ProducerSmallCard = ({ producer = {}, parent = true }) => (
    <span className="d-inline-flex align-items-center">
        <Link
            className="text-reset text-decoration-none mt-2 cus-link-hover"
            to={`/producer/${producer._id}`}
        >
            <span className="fs-6 fw-bold">
                {parent &&
                    producer.producerId &&
                    producer.producerId.producerId &&
                    producer.producerId.producerId.name + ' > '}
                {parent &&
                    producer.producerId &&
                    producer.producerId.name + ' > '}
                {producer.name}
            </span>
        </Link>
    </span>
);

export default ProducerSmallCard;
