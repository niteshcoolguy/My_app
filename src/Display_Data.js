import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredId, setHoveredId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    // const [header,setHeader]=useState("Product List")

    const navigate = useNavigate();
    console.log("Nitesh Chutiya")
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const result = await response.json();
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // if (loading) return <p>Loading...</p>;

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h}>Product List</h1>
            {/* <button onClick={()=>{setHeader("Gaurav");console.log(header)}}>click me</button> */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={styles.searchBar}
            />
            {loading ? <div style={styles.card1}>
                {[1,2,3,4].map((ele,index) => (
                    console.log(index),
                    <div key={index} style={styles.card2}></div>
                ))}
            </div> :
                <div style={styles.grid1}>
                    {currentItems.map((item) => (
                        <div key={item.id} style={styles.card} onClick={() => handleItemClick(item.id)}>
                            <img src={item.image} alt={item.title} style={styles.image} />
                            <h2
                                style={hoveredId === item.id ? { ...styles.h2, ...styles.h2Hover } : styles.h2}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {item.title}
                            </h2>
                            {hoveredId === item.id && (
                                <div style={styles.hoverBox}>{item.title}</div>
                            )}
                            <p><strong>Rating:</strong> {item.rating.rate} ({item.rating.count} reviews)</p>
                        </div>
                    ))}
                </div>
            }

            <div style={styles.pagination}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={styles.pageButton}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                            ...styles.pageButton,
                            backgroundColor: currentPage === index + 1 ? '#0056b3' : '#007BFF'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataDisplay;


const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },

    h: {
        textAlign: 'center',
    },

    searchBar: {
        padding: '10px',
        marginBottom: '20px',
        margin: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },

    grid1: {
        display: 'flex',
        flexWrap: 'wrap',  // Allow items to wrap onto the next line
        justifyContent: 'space-around',  // Distribute items evenly
        gap: '20px',  // Space between items
        cursor: 'pointer',
    },

    card: {
        width: '300px',  // Fixed width for each card (can be adjusted)
        border: '1px solid #ddd',
        padding: '20px',
        // height:"300px",
        // backgroundColor:"lightgray",
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative', // Position relative for absolute positioning of hover box
    },

    card1: {
        // width: '100%',  // Fixed width for each card (can be adjusted)
        // border: '1px solid #ddd',
        // padding: '20px',
        // height: "100vh",
        // backgroundColor: "lightgray",
        // borderRadius: '5px',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        // margin: '30px',
    },

    card2: {
        width: '500px',  // Fixed width for each card (can be adjusted)
        border: '1px solid #ddd',
        // padding: '20px',
        margin:'30px',
        height:"300px",
        backgroundColor:"lightgray",
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        
    },

    image: {
        width: '100%',
        height: '250px',
        borderRadius: '5px',
    },

    h2: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: '10px',
        transition: 'all 0.3s ease',
        position: 'relative',
    },

    h2Hover: {
        cursor: 'pointer',
    },

    hoverBox: {
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: 'auto',
        maxWidth: '250px',
        textAlign: 'center',
        zIndex: 10,
    },

    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },

    pageButton: {
        padding: '10px 15px',
        margin: '0 5px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
