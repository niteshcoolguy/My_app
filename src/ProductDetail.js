import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const result = await response.json();
            setProduct(result);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading product details...</p>;

    return (
        <div style={styles.grid1}>
            <h1>{product.title}</h1>
            <div style={styles.div2}>
                <img src={product.image} alt={product.title} style={styles.image} />
                <p style={styles.p1}>{product.description}</p>
                
                <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
        </div>
    );
};



export default ProductDetail;

const styles = {
    grid1: {
        
    },

    div2:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap:'wrap',
    },

    image: {
        width: '40%',
        padding: '30px',

    },

    p1:{
        width:'100%',
        fontSize:'30px',
        color:'black',
        padding: '30px',
        display:'flex',
        justifyContent: 'center',
        alginItem:'center',
    }


}
