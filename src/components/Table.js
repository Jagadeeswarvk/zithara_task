import React from "react";

function Table({ data }) {
  //   const startIndex = (currentPage - 1) * 20;
  //   const paginatedData = data.slice(startIndex, startIndex + 20);

  return (
    <table>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Customer Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Location</th>
          <th>DateOfCreation</th>
          <th>TimeOfCreation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.sno}>
            <td>{record.sno}</td>
            <td>{record.customername}</td>
            <td>{record.age}</td>
            <td>{record.phoneno}</td>
            <td>{record.location}</td>
            <td>{new Date(record.created_at).toLocaleDateString()}</td>
            <td>{new Date(record.created_at).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
