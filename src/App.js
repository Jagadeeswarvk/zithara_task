import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import SortOptions from "./components/SortOptions";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Trigger fetchData when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/customers/?page=${currentPage}`
      );
      // Pass currentPage to fetch the corresponding page
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = data.filter(
      (record) =>
        record.customername.toLowerCase().includes(value.toLowerCase()) ||
        record.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedData = [...filteredData].sort((a, b) => {
      if (option === "date") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (option === "time") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment currentPage when next page is clicked
  };

  return (
    <div className="App">
      <h1>Customer Data</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <SortOptions sortOption={sortOption} onSort={handleSort} />
      <Table data={filteredData} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / 20)}
        onPageChange={setCurrentPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}

export default App;
