import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserRoleLabel from '../label/UserRoleLabel';

const IMG = 'http://localhost:8000/static';

const UserCard = ({ user = {} }) => {
    const [userValue, setUserValue] = useState({});

    const init = async () => {
        setUserValue(user);
    };

    useEffect(() => {
        init();
    }, [user]);

    return (
        <div className="card shadow border-0">
            <Link
                className="text-reset text-decoration-none"
                title={userValue.firstname + ' ' + userValue.lastname}
                to={`/user/${userValue._id}`}
            >
                <div className="card-img-top cus-card-img-top">
                    <img
                        src={IMG + userValue.avatar}
                        className="cus-card-img"
                        alt={userValue.firstname + ' ' + userValue.lastname}
                    />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <small className="card-subtitle">
                    <div className="d-flex align-items-center">
                        <span className="me-1">
                            <UserRoleLabel
                                role={userValue.role}
                                detail={false}
                            />
                        </span>
                    </div>
                </small>

                <Link
                    className="text-reset text-decoration-none link-hover d-block mt-2"
                    title={userValue.firstname + ' ' + userValue.lastname}
                    to={`/user/${userValue._id}`}
                >
                    <h6
                        className="card-title"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {userValue.firstname + ' ' + userValue.lastname}
                    </h6>
                </Link>
            </div>
        </div>
    );
};

export default UserCard;
