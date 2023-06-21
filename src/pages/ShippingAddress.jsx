import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ShippingAddress = () => {
    const addressReducer = (state, event) => {
        return {...state, [event.target.name]: event.target.value}
    }

    const [person, setPerson] = useReducer(addressReducer, {})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({type: "SAVE_SHIPPING_INFO", payload: person})
        navigate('/paymentSuccess')
    }

  return (
    <>
    <form>
        <label htmlFor='name'>Name</label>
        <input type="text" className='form-control' name='name' onChange={setPerson} id='name' />
        <label htmlFor='address'>Address</label>
        <input type="text" className='form-control' name='address' onChange={setPerson} id='address'/>
        <label htmlFor='address2'>Alternate Address</label>
        <input type="text" className='form-control' name='alternate_address' onChange={setPerson} id='address2'/>
        <label htmlFor='name'>City</label>
        <input type="text" className='form-control' name='city' id='city' onChange={setPerson} />
        <label htmlFor='phone'>Phone</label>
        <input type="text" className='form-control' name='phone' id='phone' onChange={setPerson} />

        <button className='btn btn-success mt-3' onClick={handleSubmit}>Proceed to Payment</button>
    </form>
    </>
  )
}

export default ShippingAddress