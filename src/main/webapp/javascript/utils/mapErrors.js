
export default function mapErrors(res) {
    if (!!res.status && !!res.body) {
        return res.body.errors.reduce((errors, error) => {
            const fieldName = !error.fieldName ? "_error" : error.fieldName;
            if (!errors.hasOwnProperty(fieldName)) {
                errors[fieldName] = "";
            } else {
                errors[fieldName] += ", ";
            }
            errors[fieldName] += error.message;

            return errors;
        }, {});
    } else {
        return {
            _error: "Please check your network connectivity!",
        };
    }
};
