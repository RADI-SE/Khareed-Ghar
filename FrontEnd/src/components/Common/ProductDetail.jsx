import React, { useEffect, useState } from 'react'; // Import useState
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams

const ProductDetail = () => {
    const { id } = useParams(); 
    const products = useSelector(state => state.product.products); 
    const [product, setProduct] = useState(null); 

    useEffect(() => {
   
        const newProduct = products.find(product => product.id === id);
        setProduct(newProduct);
    }, [id, products]); 

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                  
                </div>
            ) : (
                <p>Loading...</p> 
            )}
        </div>
    );
}

export default ProductDetail;
