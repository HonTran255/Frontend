import { regexTest } from '../../helpers/test';

const TextArea = ({
    onChange = () => {},
    onValidate = () => {},
    value = '',
    label = 'Enter something',
    validator = 'anything',
    isValid = true,
    isDisabled = false,
    feedback = 'Please provide a valid value',
}) => {
    const onHandleChange = (e) => {
        onChange(e.target.value);
    };

    const onHandleBlur = (e) => {
        const validatorArray = validator.split('|');
        const test = validatorArray
            .map((v) => regexTest(v, e.target.value))
            .reduce((prev, curr) => prev || curr);
        onValidate(test);
    };

    return (
        <div className="cus-input-group">
            <textarea
                required
                disabled={isDisabled}
                className={`cus-input-group-input form-control ${
                    isValid ? '' : 'is-invalid'
                }`}
                onChange={onHandleChange}
                onBlur={onHandleBlur}
                rows="10"
                value={value}
            ></textarea>
            <label className="cus-input-group-label">{label}</label>
            <span className="cus-input-group-bar"></span>
            <small className="invalid-feedback">{feedback}</small>
        </div>
    );
};

export default TextArea;
