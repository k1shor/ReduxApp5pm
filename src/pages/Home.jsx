import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card'

const Home = () => {
  let items = useSelector(store => store.itemStore.items)

  let [count, setCount] = useState(8)

  let [search, setSearch] = useState(' ')
  let [filteredResult, setFilteredResult] = useState([])

  let dispatch = useDispatch()

  const load_data = () => {
    return fetch(`https://dummyjson.com/products`)
      .then(response => response.json())
      .then(data => dispatch({ type: "LOAD_DATA", payload: data.products }))
      .catch(err => console.log(err))
  }

  useEffect(()=>{
    load_data()    
  }, [])

  const filterProducts = () => {
    setFilteredResult(
      items.length>0 && items.filter(item=>item.title.toLowerCase().match(search.toLowerCase()))
    )
  }

  return (
    <>
      <div className='bg-secondary-subtle py-2'>
        <input type='search' className='form-control w-50 m-auto' placeholder='enter your search here' 
        onChange={e=>setSearch(e.target.value)} onKeyUp={filterProducts}/>
      </div>
      <div className="container my-3 p-4">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {
            search.length > 0 ?
            filteredResult.length>0 ? 
            filteredResult.slice(0,count).map((item,i) => {
              return <Card key={i} item={item} />
            })
            :
            <div className='alert alert-danger text-center h4'>No products found. Change your search.</div>
            :
            items.length>0 && items.slice(0,count).map((item,i)=>{
              return <Card key={i} item={item} />
            })
          }
        </div>
        {count < 30 ?
        <button className='btn btn-outline-warning w-100' onClick={()=>{return setCount(count+4)}}>Load More</button>
        :
        <div className='text-center h4'>All Items Loaded</div>
        }
      </div>

    </>
  )
}

export default Home