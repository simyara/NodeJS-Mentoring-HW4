import reviewServer from '../models/reviewServer';

export default {
    getAllReviews: function(productId) {
        let productData = reviewServer.getAllForProductId(productId);
        let response = {
            status: 200
        }

        if (!productData) {
            response.status = 404;
            response.body = {
                data: {
                    error: 'reviews not found'
                }
            };

            return response;
        }

        response.body = {
            data: productData
        };

        return response;
    }
};
