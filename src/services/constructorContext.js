import React from "react";

export const ConstructorContext = React.createContext({
    data: [],
    onCheckOut: (type, order) => {},
    onRemove: (item) => {}
});

