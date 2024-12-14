import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(null);
  const [newBank, setNewBank] = useState({
    bankName: "",
    bankYear: "",
    bankEmp: "",
    bankAddress: "",
    bankBranches: "",
    bankATMs: "",
  });

  const [deleteCriteria, setDeleteCriteria] = useState({
    bankId: "",
    bankName: "",
  });

  const [searchCriteria, setSearchCriteria] = useState({
    bankId: "",
    bankName: "",
  });

  const [updateCriteria, setUpdateCriteria] = useState({
    bankId: "",
    bankName: "",
  });

  const [updateData, setUpdateData] = useState({
    bankYear: "",
    bankEmp: "",
    bankAddress: "",
    bankBranches: "",
    bankATMs: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [showRecords, setShowRecords] = useState(true);
  const [showSearchSection, setShowSearchSection] = useState(true);
  const [showUpdateSection, setShowUpdateSection] = useState(true);
  const [showDeleteSection, setShowDeleteSection] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/banks")
      .then((response) => {
        setBanks(response.data);
      })
      .catch((err) => {
        console.error("Error fetching bank data:", err);
        setError("Unable to fetch bank data.");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBank({ ...newBank, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8083/api/banks", newBank)
      .then((response) => {
        setBanks([...banks, response.data]);
        setNewBank({
          bankName: "",
          bankYear: "",
          bankEmp: "",
          bankAddress: "",
          bankBranches: "",
          bankATMs: "",
        });
      })
      .catch((err) => {
        console.error("Error adding new bank:", err);
        setError("Unable to add new bank.");
      });
  };

  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteCriteria({ ...deleteCriteria, [name]: value });
  };

  const handleDelete = () => {
    const { bankId, bankName } = deleteCriteria;
    if (bankId) {
      axios
        .delete(`http://localhost:8083/api/banks/${bankId}`)
        .then(() => {
          setBanks(banks.filter((bank) => bank.bankId !== parseInt(bankId)));
          setDeleteCriteria({ bankId: "", bankName: "" });
        })
        .catch((err) => {
          console.error("Error deleting record by ID:", err);
          setError("Unable to delete record by ID.");
        });
    } else if (bankName) {
      const bankToDelete = banks.find(
        (bank) => bank.bankName.toLowerCase() === bankName.toLowerCase()
      );
      if (bankToDelete) {
        axios
          .delete(`http://localhost:8083/api/banks/${bankToDelete.bankId}`)
          .then(() => {
            setBanks(banks.filter((bank) => bank.bankId !== bankToDelete.bankId));
            setDeleteCriteria({ bankId: "", bankName: "" });
          })
          .catch((err) => {
            console.error("Error deleting record by Name:", err);
            setError("Unable to delete record by Name.");
          });
      } else {
        setError("No record found with the provided name.");
      }
    } else {
      setError("Please provide either Bank ID or Bank Name to delete.");
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = () => {
    const { bankId, bankName } = searchCriteria;
    if (bankId) {
      const result = banks.filter((bank) => bank.bankId === parseInt(bankId));
      setSearchResults(result);
    } else if (bankName) {
      const result = banks.filter(
        (bank) => bank.bankName.toLowerCase() === bankName.toLowerCase()
      );
      setSearchResults(result);
    } else {
      setError("Please provide either Bank ID or Bank Name to search.");
    }
  };

  const handleUpdateCriteriaChange = (e) => {
    const { name, value } = e.target;
    setUpdateCriteria({ ...updateCriteria, [name]: value });
  };

  const handleUpdateDataChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdate = () => {
    const { bankId, bankName } = updateCriteria;
    let bankToUpdate = null;

    if (bankId) {
      bankToUpdate = banks.find((bank) => bank.bankId === parseInt(bankId));
    } else if (bankName) {
      bankToUpdate = banks.find(
        (bank) => bank.bankName.toLowerCase() === bankName.toLowerCase()
      );
    }

    if (bankToUpdate) {
      const updatedBank = { ...bankToUpdate, ...updateData };
      axios
        .put(`http://localhost:8083/api/banks/${bankToUpdate.bankId}`, updatedBank)
        .then((response) => {
          setBanks(
            banks.map((bank) =>
              bank.bankId === bankToUpdate.bankId ? response.data : bank
            )
          );
          setUpdateCriteria({ bankId: "", bankName: "" });
          setUpdateData({
            bankYear: "",
            bankEmp: "",
            bankAddress: "",
            bankBranches: "",
            bankATMs: "",
          });
        })
        .catch((err) => {
          console.error("Error updating record:", err);
          setError("Unable to update record.");
        });
    } else {
      setError("No record found with the provided ID or Name.");
    }
  };

  return (
    <div>
      <h1>Bankfront</h1>

      {/* Add Bank Section */}
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Hide" : "Show"} Add Bank
      </button>
      {showAddForm && (
        <div>
          <h2>Add Bank</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="bankName"
                value={newBank.bankName}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Year:
              <input
                type="number"
                name="bankYear"
                value={newBank.bankYear}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Employees:
              <input
                type="number"
                name="bankEmp"
                value={newBank.bankEmp}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="bankAddress"
                value={newBank.bankAddress}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Branches:
              <input
                type="number"
                name="bankBranches"
                value={newBank.bankBranches}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              ATMs:
              <input
                type="number"
                name="bankATMs"
                value={newBank.bankATMs}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Add Bank</button>
          </form>
        </div>
      )}

      {/* View All Records Section */}
      <button onClick={() => setShowRecords(!showRecords)}>
        {showRecords ? "Hide" : "Show"} Viewing All Records
      </button>
      {showRecords && (
        <div>
          <h2>Viewing All Records</h2>
          {banks.length > 0 ? (
            <table border="1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Employees</th>
                  <th>Address</th>
                  <th>Branches</th>
                  <th>ATMs</th>
                </tr>
              </thead>
              <tbody>
                {banks.map((bank) => (
                  <tr key={bank.bankId}>
                    <td>{bank.bankId || "N/A"}</td>
                    <td>{bank.bankName || "N/A"}</td>
                    <td>{bank.bankYear || "N/A"}</td>
                    <td>{bank.bankEmp || "N/A"}</td>
                    <td>{bank.bankAddress || "N/A"}</td>
                    <td>{bank.bankBranches || "N/A"}</td>
                    <td>{bank.bankATMs || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bank data available.</p>
          )}
        </div>
      )}

      {/* Search Section */}
      <button onClick={() => setShowSearchSection(!showSearchSection)}>
        {showSearchSection ? "Hide" : "Show"} Search Bank
      </button>
      {showSearchSection && (
        <div>
          <h2>Search by ID/Name</h2>
          <label>
            Bank ID:
            <input
              type="text"
              name="bankId"
              value={searchCriteria.bankId}
              onChange={handleSearchChange}
            />
          </label>
          <br />
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={searchCriteria.bankName}
              onChange={handleSearchChange}
            />
          </label>
          <br />
          <button onClick={handleSearch}>Search</button>
          {searchResults.length > 0 && (
            <div>
              <h3>Search Results</h3>
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Employees</th>
                    <th>Address</th>
                    <th>Branches</th>
                    <th>ATMs</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((bank) => (
                    <tr key={bank.bankId}>
                      <td>{bank.bankId || "N/A"}</td>
                      <td>{bank.bankName || "N/A"}</td>
                      <td>{bank.bankYear || "N/A"}</td>
                      <td>{bank.bankEmp || "N/A"}</td>
                      <td>{bank.bankAddress || "N/A"}</td>
                      <td>{bank.bankBranches || "N/A"}</td>
                      <td>{bank.bankATMs || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Update Section */}
      <button onClick={() => setShowUpdateSection(!showUpdateSection)}>
        {showUpdateSection ? "Hide" : "Show"} Update by ID/Name
      </button>
      {showUpdateSection && (
        <div>
          <h2>Update by ID/Bank Name</h2>
          <label>
            Bank ID:
            <input
              type="text"
              name="bankId"
              value={updateCriteria.bankId}
              onChange={handleUpdateCriteriaChange}
            />
          </label>
          <br />
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={updateCriteria.bankName}
              onChange={handleUpdateCriteriaChange}
            />
          </label>
          <br />
          <h3>New Details</h3>
          <label>
            Year:
            <input
              type="number"
              name="bankYear"
              value={updateData.bankYear}
              onChange={handleUpdateDataChange}
            />
          </label>
          <br />
          <label>
            Employees:
            <input
              type="number"
              name="bankEmp"
              value={updateData.bankEmp}
              onChange={handleUpdateDataChange}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="bankAddress"
              value={updateData.bankAddress}
              onChange={handleUpdateDataChange}
            />
          </label>
          <br />
          <label>
            Branches:
            <input
              type="number"
              name="bankBranches"
              value={updateData.bankBranches}
              onChange={handleUpdateDataChange}
            />
          </label>
          <br />
          <label>
            ATMs:
            <input
              type="number"
              name="bankATMs"
              value={updateData.bankATMs}
              onChange={handleUpdateDataChange}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {/* Delete Section */}
      <button onClick={() => setShowDeleteSection(!showDeleteSection)}>
        {showDeleteSection ? "Hide" : "Show"} Delete Bank
      </button>
      {showDeleteSection && (
        <div>
          <h2>Delete by ID/Name</h2>
          <label>
            Bank ID:
            <input
              type="text"
              name="bankId"
              value={deleteCriteria.bankId}
              onChange={handleDeleteChange}
            />
          </label>
          <br />
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={deleteCriteria.bankName}
              onChange={handleDeleteChange}
            />
          </label>
          <br />
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
