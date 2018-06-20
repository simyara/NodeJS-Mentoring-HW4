import userServer from '../models/userServer';

export default {
    getAllUsers:  function () {
        return {
            status : 200,
            body : {
                status:'success',
                data: userServer.getItemsList()
            }
        }
    }
};


