// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract EthDB {
    // Global functions
    mapping(uint16 => Company) dbCompanies;
    mapping(uint16 => Product) dbProducts;
    mapping(uint16 => Client) dbClients;
    mapping(uint16 => Invoice) dbInvoices;

    uint16 public invoiceIdCounter = 0;
    uint16 public companyIdCounter = 0;
    uint16 public productIdCounter = 0;
    uint16 public clientIdCounter = 0;

    // Estructuras
    struct Company {
        string vat;
        string postalAddress;
        string name;
        uint16 id;
    }

    struct Product {
        string productAddress;
        uint16 id;
        string name;
        string price;
    }

    struct Client {
        string postalAddress;
        string name;
        string email;
        string phone;
        string nationalId;
    }

    struct Invoice {
        string businessAddress;
        string clientAddress;
        uint16 id;
        string date;
        string amount;
        string status;
    }

    function createCompany(
        string memory vat,
        string memory postalAddress,
        string memory name
    ) public {
        Company memory company = Company(
            vat,
            postalAddress,
            name,
            companyIdCounter
        );
        dbCompanies[companyIdCounter] = company;
        companyIdCounter++;
    }

    function listCompanies() public view returns (Company[] memory) {
        Company[] memory companies = new Company[](companyIdCounter);
        for (uint16 i = 0; i < companyIdCounter; i++) {
            companies[i] = dbCompanies[i];
        }
        return companies;
    }

    function createProduct(
        string memory productAddress,
        string memory name,
        string memory price
    ) public {
        Product memory product = Product(
            productAddress,
            productIdCounter,
            name,
            price
        );
        dbProducts[productIdCounter] = product;
        productIdCounter++;
    }

    function listProducts() public view returns (Product[] memory) {
        Product[] memory products = new Product[](productIdCounter);
        for (uint16 i = 0; i < productIdCounter; i++) {
            products[i] = dbProducts[i];
        }
        return products;
    }

    function createClient(
        string memory postalAddress,
        string memory name,
        string memory email,
        string memory phone,
        string memory nationalId
    ) public {
        Client memory client = Client(
            postalAddress,
            name,
            email,
            phone,
            nationalId
        );
        dbClients[clientIdCounter] = client;
        clientIdCounter++;
    }

    function listClients() public view returns (Client[] memory) {
        Client[] memory clients = new Client[](clientIdCounter);
        for (uint16 i = 0; i < clientIdCounter; i++) {
            clients[i] = dbClients[i];
        }
        return clients;
    }
}
