import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abi from './contracts/EthDB.json';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [companies, setCompanies] = useState([]);

  // Form data
  const [vat, setVat] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          const newProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(newProvider);

          const newSigner = await newProvider.getSigner();
          setSigner(newSigner);

          const contractInstance = new ethers.Contract(
            '0x5fbdb2315678afecb367f032d93f642f64180aa3',
            abi.abi,
            newSigner
          );
          setContract(contractInstance);

          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error("Error requesting accounts", error);
        }
      } else {
        console.error("MetaMask not detected");
      }
    }

    initialize();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (!account || !provider) return;
      try {
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error fetching balance", error);
      }
    }

    fetchBalance();
  }, [account, provider]);

  // Función para manejar el envío del formulario y crear una compañía
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const tx = await contract.createCompany(vat, postalAddress, name);
      await tx.wait();
      console.log("Compañía creada exitosamente");

      // Limpiar el formulario
      setVat("");
      setPostalAddress("");
      setName("");

      // Actualizar la lista de compañías
      fetchCompanies();
    } catch (error) {
      console.error("Error creating company", error);
    }
  };

  // Función para obtener y mostrar todas las compañías
  const fetchCompanies = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const companies = await contract.listCompanies();
      setCompanies(companies);
      console.log("listCompanies", companies);
    } catch (error) {
      console.error("Error fetching companies", error);
    }
  };

  // Llamar a fetchCompanies cuando se cargue el contrato
  useEffect(() => {
    if (contract) {
      fetchCompanies();
    }
  }, [contract]);

  return (
    <div className="App">
      <h1>Crear Compañía</h1>
      <div>
        Account: {account} <br />
        Balance: {balance} ETH
      </div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>VAT:</label>
          <input
            type="text"
            value={vat}
            onChange={(e) => setVat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Postal Address:</label>
          <input
            type="text"
            value={postalAddress}
            onChange={(e) => setPostalAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Compañía</button>
      </form>

      <h2>Compañías Creadas</h2>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            <p><strong>ID:</strong> {company.id}</p>
            <p><strong>VAT:</strong> {company.vat}</p>
            <p><strong>Postal Address:</strong> {company.postalAddress}</p>
            <p><strong>Name:</strong> {company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
