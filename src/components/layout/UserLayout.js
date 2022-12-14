import MainLayout from './MainLayout';
// import UserNav from './menu/UserNav';
import Cover from '../image/Cover';
import Avatar from '../image/Avatar';

const UserLayout = ({ user = {}, children = null }) => (
    <MainLayout>
        <div
            className="user-layout"
            style={{ maxWidth: '990px', margin: '0 auto' }}
        >
            <div className="px-2 position-relative shadow">
                <Cover
                    cover={user.cover}
                    alt={user.firstname + ' ' + user.lastname}
                />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={user.avatar}
                        name={user && user.firstname + ' ' + user.lastname}
                        bodername={true}
                        alt={user.firstname + ' ' + user.lastname}
                    />
                </div>
            </div>
        </div>

        {/* <UserNav user={user} /> */}

        <div className="user-page-main mt-3">{children}</div>
    </MainLayout>
);

export default UserLayout;
