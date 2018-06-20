let reviewItems = [
    {
        id: 1,
        productId: 1,
        userId: 2,
        mark: 3
    },
    {
        id: 2,
        productId: 1,
        userId: 3,
        mark: 4
    },
    {
        id: 3,
        productId: 1,
        userId: 4,
        mark: 5
    },
    {
        id: 4,
        productId: 2,
        userId: 2,
        mark: 1
    },
    {
        id: 5,
        productId: 2,
        userId: 3,
        mark: 2
    },
    {
        id: 6,
        productId: 1,
        userId: 6,
        mark: 5
    },
    {
        id: 7,
        productId: 3,
        userId: 2,
        mark: 2
    },
    {
        id: 8,
        productId: 3,
        userId: 3,
        mark: 3
    },
    {
        id: 9,
        productId: 3,
        userId: 4,
        mark: 4
    },
    {
        id: 10,
        productId: 3,
        userId: 5,
        mark: 5
    },



];

export default {
    getAllForProductId(productId) {
        return reviewItems.filter((x) => x.productId === parseInt(productId));
    }
};
