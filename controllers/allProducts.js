import productServer from '../models/productServer';

export default {
    getAllProducts:  function () {
        return {
            status : 200,
            body : {
                status:'success',
                data: productServer.getItemsList()
            }
        }
    }
};


