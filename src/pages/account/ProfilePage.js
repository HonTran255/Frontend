import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountLayout from '../../components/layout/AccountLayout';
import UserProfileInfo from '../../components/info/UserProfileInfo';
import UserJoinedInfo from '../../components/info/UserJoinedInfo';
import Cover from '../../components/image/Cover';
import Avatar from '../../components/image/Avatar';

const ProfilePage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="res-mx--12-md">
                <div className="position-relative px-2">
                    <Cover
                        cover={user.cover}
                        alt={user.firstname + ' ' + user.lastname}
                        isEditable="user"
                    />
                    <div className="avatar-absolute avatar-absolute--store">
                        <Avatar
                            avatar={user.avatar}
                            name={user.firstname + ' ' + user.lastname}
                            alt={user.firstname + ' ' + user.lastname}
                            bodername={true}
                            isEditable="user"
                        />
                    </div>

                </div>

                <div className="mt-1">
                    <UserProfileInfo user={user} isEditable={true} />
                </div>

                <div className="mt-1">
                    <UserJoinedInfo user={user} />
                </div>
            </div>
        </AccountLayout>
    );
};

export default ProfilePage;
