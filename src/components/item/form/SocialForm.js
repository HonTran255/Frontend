import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authsocial, setToken } from '../../../apis/auth';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import {GoogleLogin} from '@react-oauth/google';
import jwt from "jwt-decode";


const SocialForm = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useNavigate();
    return (
        <>
            {isloading && <Loading />}
            {error && (
                <div className="col-12">
                    <Error msg={error} />
                </div>
            )}

            <GoogleLogin
                onSuccess={credentialResponse => {
                    <button
                    type="button"
                    className="btn btn--with-img btn-outline-primary ripple fw-bold"
                >
                <img
                    className="social-img me-2 rounded-circle"
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                />
                    Continue with Google
                </button>
                        const decoded = jwt(credentialResponse.credential);
                        console.log(decoded);
                        setIsLoading(true);
                        const data = decoded.profileObj || decoded;
                        const user = {
                            firstname: data.givenName || data.name.split(' ')[0],
                            lastname:
                                (data.familyName ? data.familyName : data.givenName) ||
                                data.name.split(' ')[1],
                            email: data.email,
                        };
                
                        if (data.sub) user.googleId = data.sub;
                        if (data.userID) user.facebookId = data.userID;
                
                        authsocial(user)
                            .then((data) => {
                                if (data.error) {
                                    setError(data.error);
                                    setIsLoading(false);
                                } else {
                                    const { accessToken, refreshToken, _id, role } = data;
                                    setToken({ accessToken, refreshToken, _id, role }, () => {
                                        history(0);
                                    });
                                }
                            })
                            .catch((error) => {
                                setError('Server error!');
                                setIsLoading(false);
                            });
                    }
                }
                
            />

{/* https://figureweb-5ab7b.firebaseapp.com/__/auth/handler */}

             {/* <button
                type="button"
                className="btn btn--with-img btn-outline-primary ripple fw-bold"
            >
            <img
                className="social-img me-2 rounded-circle"
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
            />
                Continue with Facebook
            </button> */}
        </>
    );
};

export default SocialForm;
