import React from "react";
import { render } from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import "./drag.scss";

let foods = ["Chips", "Cupcake", "Dount", "Doritos", "Popcorn"];
class Container extends React.Component {
    render() {
        let Snacks = this.props.foods.map((item,i) => (<FoodItem key={i} foodItem={item}/>))
        return  (
            <div>
                <ul>{Snacks}</ul>
                <ShoppingCart />
            </div>
        )
    }
}
DragDropContext(HTML5Backend)(Container)

export class FoodItem extends React.Component {//组件名字必须大写
    render() {
        return (
            <li className="snack">{this.props.foodItem}</li>
        )
    }
}
export class ShoppingCart extends React.Component {
    render() {
        const style = {
            backgroundColor: "#fff"
        }
        return (
           <div className="shopping-cart" style={style}>Drag here to order!</div>
        )
    }
}
render(<DragDropContext(HTML5Backend)(Container) foods={foods}/>, document.getElementById('root'))