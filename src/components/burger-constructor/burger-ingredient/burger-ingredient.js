import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import {ingredientPropType} from "../../../utils/prop-types";
import {useDispatch} from "react-redux";
import {removeIngredient} from "../../../services/reducers/burgerSlice";
import {useDrag, useDrop} from "react-dnd";

const BurgerIngredient = function ({id, item, index, moveIngredient}) {

    const ref = useRef(null)
    const [{ handlerId }, dropRef] = useDrop({
        accept: "item",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveIngredient(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })
    const [{ isDragging }, dragRef] = useDrag({
        type: "item",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    const cursor = isDragging ? "move" : "none"

    const dispatch = useDispatch()

    function onRemoveFromCart(item) {
        dispatch(removeIngredient(item))
    }

    dragRef(dropRef(ref))

    return(<div className={`${styles.item} ${opacity} ${cursor}`} ref={ref}>
        <DragIcon type="primary"/> <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onRemoveFromCart(item)}
    />
    </div>)

}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
    item: ingredientPropType.isRequired
}