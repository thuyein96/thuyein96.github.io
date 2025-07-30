import React, { useRef, useState } from "react";

const DataTable = ({data, onDelete}) => {
    const sRef = useRef();
    const [filteredSelectedItems, setFilteredSelectedItems] = useState(data);


    const sortAscending = () => {
        const sortedData = [...filteredSelectedItems].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredSelectedItems(sortedData);
    };

    const sortDescending = () => {
        const sortedData = [...filteredSelectedItems].sort((a, b) => b.name.localeCompare(a.name));
        setFilteredSelectedItems(sortedData);
    };

    return (
        <div>
            <button onClick={sortAscending}>Sort Ascending</button>
            <button onClick={sortDescending}>Sort Descending</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSelectedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => onDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default DataTable;