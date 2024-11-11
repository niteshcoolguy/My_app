import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch product data from Fake Store API
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const result = await response.json();
            setProduct(result);
        };
        fetchProduct();
    }, [id]);

    // Fetch user data from Random User API
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://randomuser.me/api`);
            const result = await response.json();
            setUser(result.results[0]);
        };
        fetchUser();
    }, []);

    if (!product) return <p>Loading product details...</p>;

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div style={styles.grid1}>
            <h1>{product.title}</h1>
            <div style={styles.div2}>
                <img src={product.image} alt={product.title} style={styles.image} />
                <p style={styles.p1}>{product.description}</p>
                <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>

            {/* Display user data */}
            <h2 style={styles.h2}>Employees Information</h2>
            <div style={styles.userContainer}>
                {user ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div 
                            key={index} 
                            style={styles.userCard} 
                            onClick={() => openModal(user)}
                        >
                            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} style={styles.userImage} />
                            <p><strong>Name:</strong> {user.name.title} {user.name.first} {user.name.last}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                            <p><strong>ID:</strong> {user.id.name} {user.id.value}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <div style={styles.modalOverlay} onClick={closeModal}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeButton} onClick={closeModal}>X</button>
                        <img src={selectedUser.picture.large} alt={`${selectedUser.name.first} ${selectedUser.name.last}`} style={styles.userImage} />
                        <p><strong>Name:</strong> {selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}</p>
                        <p><strong>Gender:</strong> {selectedUser.gender}</p>
                        <p><strong>ID:</strong> {selectedUser.id.name} {selectedUser.id.value}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;

const styles = {
    h2: {
        textAlign: 'center',
    },
    div2: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    image: {
        width: '40%',
        padding: '30px',
    },
    p1: {
        width: '100%',
        fontSize: '30px',
        color: 'black',
        padding: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        display: 'flex',
        marginTop: '20px',
        textAlign: 'center',
    },
    userCard: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '300px',
        margin: '10px auto',
        textAlign: 'center',
        cursor: 'pointer',
    },
    userImage: {
        width: '100px',
        borderRadius: '50%',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        position: 'relative',
        maxWidth: '400px',
        width: '90%',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
    },
};
