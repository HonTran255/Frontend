import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DropDownMenu from '../../ui/DropDownMenu';

const listOptions = [
    {
        value: 'products',
        label: 'product',
        icon: <i className="fas fa-box"></i>,
    },
    {
        value: 'categories',
        label: 'category',
        icon: <i className="fas fa-user-friends"></i>,
    },
];

const SearchBar = () => {
    const location = useLocation();
    const history = useNavigate();

    const currentOption = location.pathname.split('/')[1];

    const [query, setQuery] = useState(() => {
        if (
            currentOption === 'products' ||
            currentOption === 'categories'
        )
            return new URLSearchParams(location.search).get('keyword') || '';
        else return '';
    });
    const [option, setOption] = useState(() => {
        if (
            currentOption === 'products' ||
            currentOption === 'categories'
        )
            return currentOption;
        else return 'products';
    });

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        history(`/${option}/search?keyword=${query}`);
    };

    return (
        <form
            className="search-bar m-0 input-group"
            onSubmit={handleFormSubmit}
        >
            <button
                className="btn btn-outline-light cus-outline text-white ripple"
                type="submit"
                onClick={handleFormSubmit}
            >
                <i className='fa fa-search'></i>
            </button>
            <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={query}
                onChange={handleChange}
            />

            <button
                className="btn btn-outline-light cus-outline text-white ripple"
                type="submit"
                onClick={handleFormSubmit}
            >
                <i>Tất cả sản phẩm</i>
            </button>
        </form>
    );
};

export default SearchBar;
