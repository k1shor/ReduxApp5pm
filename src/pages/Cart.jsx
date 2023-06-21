import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Cart = () => {
    let cartItems = useSelector(store => store.cartStore.cart_items)
    let dispatch = useDispatch()

    const handleRemove = cart_id => e => {
        e.preventDefault()
        dispatch({ type: "REMOVE_FROM_CART", payload: cart_id })

    }

    const decreaseQuantity = item => e => {
        e.preventDefault()
        console.log(item)
        let new_quantity = item.quantity-1
        if(new_quantity<=0){
            Swal.fire({
                title:"Warning",
                text: "Cannot decrease quantity. Remove item instead.",
                showCancelButton: true
            })
            .then(result=>{
                if(result.isConfirmed){
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.cart_id })
                }
            })
        }
        else{
            let new_cart_item = {...item, quantity: new_quantity}
    
            dispatch({
                type: "UPDATE_CART",
                payload: new_cart_item
            })
        }
    }
    const increaseQuantity = item => e => {
        e.preventDefault()
        let new_quantity = item.quantity + 1 
        if(new_quantity> item.stock){
            Swal.fire({
                title:"Alert",
                text: "Maximum Quantity Reached.",
                icon: "warning"
            })
        }
        else{
            let new_cart_item = {...item, quantity: new_quantity}
            dispatch({
                type: "UPDATE_CART",
                payload: new_cart_item
            })
        }
    }

    return (
        <>
            <div className="container p-5 my-5 mx-auto">
                <table className='table table-bordered table-hover text-center align-middle'>
                    <thead className='table-dark'>
                        <tr>
                            <td>S.No.</td>
                            <td>Product Image</td>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Quantity</td>
                            <td>Total Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems &&
                            cartItems.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img src={item.images[0]} alt={item.title} style={{ height: '100px' }} />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>${item.price}</td>
                                    <td>
                                    <div className="btn-group">
                                        <button className='btn btn-warning' onClick={decreaseQuantity(item)}> - </button>
                                        <div className='px-3 border-0 py-2'>
                                            {item.quantity}
                                            </div> 
                                        <button className='btn btn-success' onClick={increaseQuantity(item)}> + </button>
                                    </div>
                                    </td>
                                    <td>${item.quantity * item.price}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={handleRemove(item.cart_id)}>Remove</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Link to={'/checkout'} className='btn btn-info'>Proceed to Checkout</Link>
            </div>
        </>
    )
}

export default Cart