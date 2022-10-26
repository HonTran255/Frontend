export const totalProducts = (items = [])=> {
    let totalPrice, totalPromotionalPrice;

    try {
        totalPrice = items.reduce(
            (prev, item) =>
                parseFloat(prev) +
                parseFloat(item.productId.price.$numberDecimal) *
                    parseFloat(item.count),
            0,
        );
    } catch (e) {
        totalPrice = 0;
    }

    try {
        totalPromotionalPrice = items.reduce(
            (prev, item) =>
                parseFloat(prev) +
                parseFloat(item.productId.promotionalPrice.$numberDecimal) *
                    parseFloat(item.count),
            0,
        );
    } catch (e) {
        totalPromotionalPrice = 0;
    }

    return {
        totalPrice,
        totalPromotionalPrice
    };
};

export const totalDelivery = (delivery = {}) => {
    let deliveryPrice

    try {
        deliveryPrice = delivery.price.$numberDecimal;
    } catch (e) {
        deliveryPrice = 0;
    }

    return {
        deliveryPrice
    };
};

