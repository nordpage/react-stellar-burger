import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

export const feedPropType = PropTypes.shape({
    _id: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    number: PropTypes.number
})
