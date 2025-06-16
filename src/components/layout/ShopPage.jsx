import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components";

const StyledPaginateContainer = styled.div`
        .pagination {
            list-style: none;
            height: 31.5px;
            width: 31.5px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2px;
            cursor: pointer;
        }

        .active {
            border: 1px solid black;
            border-radius: 50%;
        }
        .page-item {
            list-style: none;
            padding: 2px 12px;
            height: 31.5px;
            width: 31.5px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2px;
        }
`;

const getURL = (sort) => {
    switch(sort) {
        case "a-z":
            return "?sortBy=title&order=asc";
        case "z-a":
            return "?sortBy=title&order=desc";
        case "low-to-high":
            return "?sortBy=price&order=asc";
        case "high-to-low":
            return "?sortBy=price&order=desc";
    }
}

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentProducts, setCurrentProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [filterData, setFilterData] = useState();
    let navigate = useNavigate();
    
    console.log(currentProducts);
    const currentPage = parseInt(searchParams.get("page") || 1, 10);
    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "a-z";
    const maxShown = 5;

    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res=>res.json())
            .then(res=>setCategories(res))
    },[]);

    useEffect(() => {
        if (!currentProducts) return;

        setFilterData(
            currentProducts.filter((item, index) => {
                return (index >= currentPage * maxShown) && (index < (currentPage + 1) * maxShown);
            })
        );
    }, [currentProducts, currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            const url = 
                category === "all"
                    ? "https://dummyjson.com/products"+getURL(sort)
                    : `https://dummyjson.com/products/category/${category}`+getURL(sort);
            const res = await fetch(url);
            const data = await res.json();
            setCurrentProducts(data.products || []);
        };

        fetchData();
    }, [category, sort]);

    const handlePageChange = (event) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", event.selected);
        setSearchParams(newParams);
    }

    const handleProductPageNavigation = (productId) => {
        navigate(`/shop/${category}/${productId}`)
    }

    return (
        <div>
        {categories && (
                <select 
                    name="categories" 
                    id="categories"
                    value={category}
                    onChange={(e) => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set("category", e.target.value);
                        newParams.set("page", 0); // reset to first page
                        setSearchParams(newParams);
                    }}>
                        <option value="all">All</option>
                        {categories.map((cat) => (
                            <option value={cat} key={cat}>{cat}</option>
                        ))}
                </select>
        )}
        {
            <select 
                name="sort-items" 
                id="sort-items"
                value={sort}
                onChange={(e) => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set("sort", e.target.value);
                    newParams.set("page", 0);
                    setSearchParams(newParams);
                }}>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
        }
        {filterData && (
            <>
                {filterData.map((product) => (
                    <>
                        <div onClick={() => handleProductPageNavigation(product.id)}>
                            {product.title}
                            <img src={product.thumbnail} width={"100px"} height={"100px"}/>
                            {product.price}
                        </div>
                        {/* <div>
                            {product.images[0]}
                        </div>
                        <div>
                            {product.thumbnail}
                        </div> */}
                    </>
                ))}
            </>
        )}
        <StyledPaginateContainer>
        <ReactPaginate
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            onPageChange={handlePageChange}
            pageCount={Math.ceil(currentProducts?.length / maxShown)}
            breakLabel="..."
            previousLabel={
                <IconContext.Provider value={{color: "#B8C1CC", size: "36px"}}>
                    <AiOutlineArrowLeft/>
                </IconContext.Provider>
            }
            nextLabel={
                <IconContext.Provider value={{color: "#B8C1CC", size: "36px"}}>
                    <AiOutlineArrowRight/>
                </IconContext.Provider>
            }
            />
        </StyledPaginateContainer>
        </div>
    );
};

export default ShopPage;