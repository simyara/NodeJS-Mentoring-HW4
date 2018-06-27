import { difference } from 'lodash';

export function validate(obj, schema) {

    let errorRedundantFieldsMessage;
    let errorMessage;

    let redundantFields = difference(Object.keys(obj), Object.keys(schema));

    if (redundantFields.length > 0) {
        errorRedundantFieldsMessage = redundantFields.join(', ') + ' is not defined for the object';
    }

    let errorString = Object.keys(schema).map((key) => {

        if (schema[key].required) {
            if (obj[key] === 'undefined') {
                errorMessage = `${key} value is required`;
                return errorMessage;
            }
        }

        if ((typeof obj[key]) !== schema[key].type) {
            errorMessage = `${key} type mismatch`;
            return errorMessage;
        }

        if (schema[key].type === 'object') {
            let res = validate(obj[key], schema[key].properties);

            return res.errorMessage;
        }
    }).filter(function (x) {
        return x;
    });

    if (errorRedundantFieldsMessage) {
        errorString.unshift(errorRedundantFieldsMessage);
    }

    let resObj = {
        isValid: errorString.length <= 0,
        errorMessage: errorString.join('; ')
    };

    console.log(resObj);

    return resObj;

}
