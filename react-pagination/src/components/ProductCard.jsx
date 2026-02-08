/*
  Presentational component:
  - Responsible only for UI
  - No state, no side-effects
  - Easy to reuse and test
*/
const ProductCard = ({image, title}) => {
  return (
    <div className='product-card'>
        <img src={image} alt={title} loading="lazy" className='product-img'/>
        <span>{title}</span>
    </div>
  )
}

export default ProductCard