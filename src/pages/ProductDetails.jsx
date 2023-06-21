import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import Swal from 'sweetalert2'

const ProductDetails = () => {
    let { id } = useParams()
    let [product, setProduct] = useState({})

    let [Quantity, setQuantity] = useState(1)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    let cart_items = useSelector(store => store.cartStore.cart_items)

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        let itemExists = cart_items.find(item => item.id === product.id)
        if (itemExists) {
            Swal.fire({
                title: "Alert", 
                text: "Item already in cart. Do you wish to add more?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: '#aa0000'})
                .then(result=>{
                    if(result.isConfirmed){
                        let new_quantity = itemExists.quantity + Quantity
                        if(new_quantity > itemExists.stock){
                            Swal.fire("Alert", "Maximum quantity reached. Try reducing quantity", "warning")
                        }
                        else{
                            let cart_item = {...itemExists, quantity : new_quantity}
                            dispatch({type: "UPDATE_CART", payload: cart_item})
                            Swal.fire({
                                title: "Congrats",
                                text: "Your item quantity has been raised in Cart. Continue Shopping",
                                icon: "success",
                                showCancelButton: true,
                                cancelButtonColor: "#dd0000",
                                cancelButtonText: "Go to Cart",
                                confirmButtonText: "Continue Shopping",
                                // timer: 1000
                            })
                                .then(result => {
                                    if (result.isConfirmed) {
                                        navigate('/')
                                    }
                                    if (result.isDismissed) {
                                        navigate('/cart')
                                    }
                                })
                        }
                    }
                })

        }
        else {
            let cart_item = { ...product, quantity: Quantity, cart_id: Date.now() }
            // console.log(cart_item)
            dispatch({ type: "ADD_TO_CART", payload: cart_item })
            // Swal.fire("Congrats","Item added to Cart.", "success")
            Swal.fire({
                title: "Congrats",
                text: "Your item has been placed on Cart. Continue Shopping",
                icon: "success",
                showCancelButton: true,
                cancelButtonColor: "#dd0000",
                cancelButtonText: "Go to Cart",
                confirmButtonText: "Continue Shopping",
                // timer: 1000
            })
                .then(result => {
                    if (result.isConfirmed) {
                        navigate('/')
                    }
                    if (result.isDismissed) {
                        navigate('/cart')
                    }
                })

        }

    }


    return (
        <>
            <div className="container mx-auto my-3">
                <div className="row align-items-center">
                    <div className="col-md-6 p-5">
                        {
                            product && product.images &&
                            <img src={product.images[0]} alt="" className='w-100' />
                        }
                        <div className='d-flex'>
                            {
                                product && product.images &&
                                product.images.map(img => {
                                    return <img src={img} style={{ height: '70px' }} />
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-6 p-5">
                        <h2>{product.title}</h2>
                        <h3>${product.price}</h3>
                        <p >Product Details: {product.description}</p>
                        <h3>In Stock: {product.stock}</h3>
                        <h3>Ratings:
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starDimension='36px'
                            />
                        </h3>
                        <div className="d-flex w-50">
                            <h3>Quantity:</h3>
                            <input type="number" className='form-control ms-4' min={1} max={product.stock} value={Quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                        </div>
                        <button className='btn btn-warning w-100 mt-3' onClick={handleSubmit}>Add to Cart</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetails