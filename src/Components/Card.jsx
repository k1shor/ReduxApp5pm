import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    return (
        <>
            <div className="col">
                <div className="card" title={item.title}>
                    <img src={item.images[0]} className="card-img-top" alt="..." style={{height:'200px'}}/>
                    <div className="card-body">
                        <h5 className="card-title text-truncate">{item.title}</h5>
                        <h6 className="card-title">${item.price}</h6>
                       <Link to={`/product/${item.id}`} className='btn btn-warning w-100'>View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card