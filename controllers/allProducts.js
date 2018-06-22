import productServer from '../models/productServer';

export default {
    getAllProducts: function () {
        return {
            status: 200,
            body: {
                data: productServer.getItemsList()
            }
        }
    }
};
