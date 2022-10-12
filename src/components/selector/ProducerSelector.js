import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { listProducers, listActiveProducers } from '../../apis/producer';
import SearchInput from '../ui/SearchInput';
import ProducerSmallCard from '../card/ProducerSmallCard';
import Error from '../ui/Error';
import Loading from '../ui/Loading';

const ProducerSelector = ({
    defaultValue = '',
    isActive = false,
    selected = 'child',
    label = 'Chọn danh mục',
    onSet = () => {},
    isSelected = true,
    isRequired = false,
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [lv1Categories, setLv1Categories] = useState([]);

    const [lv1Filter, setLv1Filter] = useState({
        search: '',
        producerId: null,
        sortBy: 'name',
        order: 'asc',
        limit: 100,
        page: 1,
    });


    const [selectedProducer, setSelectedProducer] = useState(defaultValue);

    const loadCategories = (filter, setProducers) => {
        setError('');
        setIsLoading(true);
        if (isActive) {
            listActiveProducers(filter)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setProducers(data.producers);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        } else {
            const { _id, accessToken } = getToken();
            listProducers(_id, accessToken, filter)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setProducers(data.producers);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        loadCategories(lv1Filter, setLv1Categories);
    }, [lv1Filter]);

    useEffect(() => {
        setSelectedProducer(defaultValue);
    }, [defaultValue]);

    const handleChangeKeyword = (keyword) => {
        setLv1Filter({
            ...lv1Filter,
            search: keyword,
        });
    };

    const handleClick = (filter, setFilter, producer) => {
        if ((setFilter, filter))
            setFilter({
                ...filter,
                producerId: producer._id,
            });

        if (isSelected)
            if (
                (selected === 'child' && filter === null)
            ) {
                setSelectedProducer(producer);
                if (onSet) onSet(producer);
            }
    };

    const handleDelete = () => {
        setSelectedProducer('');
        if (onSet) onSet('');
    };

    return (
        <div className="row">
            <div className="col">
                <SearchInput onChange={handleChangeKeyword} />
            </div>

            <div className="col-12 position-relative">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex border p-1 mt-2">
                    <div
                        className="list-group m-1"
                        style={{
                            width: '33.33333%',
                            overflowY: 'auto',
                        }}
                    >
                        {lv1Categories &&
                            lv1Categories.map((producer, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={"list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center"}
                                    onClick={() =>
                                        handleClick(
                                            null,
                                            null,
                                            producer,
                                        )
                                    }
                                >
                                    <span className="res-smaller-md">
                                        {producer.name}
                                    </span>
                                    <i className="fas fa-angle-right res-smaller-lg res-hide"></i>
                                </button>
                            ))}
                    </div>
                </div>
            </div>

            {isSelected && (
                <div className="col mt-2">
                    <div className="mt-4 position-relative">
                        <label
                            className="position-absolute text-muted"
                            style={{
                                fontSize: '0.8rem',
                                left: '12px',
                                top: '-16px',
                            }}
                        >
                            {label}
                        </label>

                        <div className="form-control border-0">
                            {selectedProducer ? (
                                <div className="position-relative">
                                    <div className="me-5">
                                        <ProducerSmallCard
                                            producer={selectedProducer}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ripple position-absolute"
                                        style={{
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            right: '0',
                                        }}
                                        onClick={() => handleDelete()}
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                </div>
                            ) : (
                                <span
                                    className={isRequired ? 'text-danger' : ''}
                                >
                                    No category choosed
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ProducerSelector;
