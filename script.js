window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connectWalletButton');
    const etherBalanceElement = document.getElementById('etherBalance');
    const normalTransactionsTable = document.getElementById('normalTransactionsTable');
    const internalTransactionsTable = document.getElementById('internalTransactionsTable');
    const erc20TokenTable = document.getElementById('erc20TokenTable');
    const erc721TokenTable = document.getElementById('erc721TokenTable');
    const erc1155TokenTable = document.getElementById('erc1155TokenTable');

    connectWalletButton.addEventListener('click', async () => {
        if (typeof ethereum === 'undefined') {
            console.error('Ethereum provider not found. Please install MetaMask or another wallet extension.');
            return;
        }

        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            updateUI();
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    });

    async function updateUI() {
        if (typeof ethereum === 'undefined') {
            showAlert('Ethereum provider not found. Please install MetaMask or another wallet extension.');
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const address = accounts[0];

        // Fetch and display Ether balance using Etherscan API
        try {
            const etherscanApiKey = 'F3F9UE7R37YCNTJCND18T25FTI5K2G3JGG';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const etherBalance = web3.utils.fromWei(data.result, 'ether');
                etherBalanceElement.textContent = etherBalance || '0.00';
            } else {
                console.error('Error fetching ether balance:', data.message);
                etherBalanceElement.textContent = '0.00';
            }
        } catch (error) {
            console.error('Error fetching ether balance:', error);
        }

        // Fetch and display normal transactions using Etherscan API
        try {
            const etherscanApiKey = 'WMTGG9ZVVPARDUBDXPNKVAW35QZ383S4M4';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const transactions = data.result;
                if (transactions.length === 0) {
                    normalTransactionsTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
                } else {
                    transactions.forEach(transaction => {
                        const row = normalTransactionsTable.insertRow();
                        const hashCell = row.insertCell();
                        const valueCell = row.insertCell();
                        hashCell.textContent = transaction.hash;
                        valueCell.textContent = web3.utils.fromWei(transaction.value, 'ether');
                    });
                }
            } else {
                console.error('Error fetching normal transactions:', data.message);
                normalTransactionsTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching normal transactions:', error);
        }

        // Fetch and display internal transactions using Etherscan API
        try {
            const etherscanApiKey = '322HQ9G6UJS36H1VQ1BGSGUEF4URTRP1J4';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const internalTransactions = data.result;
                if (transactions.length === 0) {
                    internalTransactionsTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
                } else {
                    internalTransactions.forEach(transaction => {
                        const row = internalTransactionsTable.insertRow();
                        const hashCell = row.insertCell();
                        const valueCell = row.insertCell();
                        hashCell.textContent = transaction.hash;
                        valueCell.textContent = web3.utils.fromWei(transaction.value, 'ether');
                    });
                }

            } else {
                console.error('Error fetching internal transactions:', data.message);
                internalTransactionsTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching internal transactions:', error);
        }

        // Fetch and display ERC20 token transfers using Etherscan API
        try {
            const etherscanApiKey = 'F3F9UE7R37YCNTJCND18T25FTI5K2G3JGG';
            const contractAddress = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const tokenTransfers = data.result;
                if (transactions.length === 0) {
                    erc20TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
                } else {
                    tokenTransfers.forEach(transfer => {
                        const row = erc20TokenTable.insertRow();
                        const hashCell = row.insertCell();
                        const valueCell = row.insertCell();
                        hashCell.textContent = transfer.hash;
                        valueCell.textContent = web3.utils.fromWei(transfer.value, 'ether');
                    });
                }

            } else {
                console.error('Error fetching ERC20 token transfers:', data.message);
                erc20TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching ERC20 token transfers:', error);
        }

        // Fetch and display ERC721 token transfers using Etherscan API
        try {
            const etherscanApiKey = 'WMTGG9ZVVPARDUBDXPNKVAW35QZ383S4M4';
            const contractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const tokenTransfers = data.result;
                if (transactions.length === 0) {
                    erc721TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
                } else {
                    tokenTransfers.forEach(transfer => {
                        const row = erc721TokenTable.insertRow();
                        const tokenIdCell = row.insertCell();
                        const tokenContractCell = row.insertCell();
                        tokenIdCell.textContent = transfer.tokenID;
                        tokenContractCell.textContent = transfer.contractAddress;
                    });
                }

            } else {
                console.error('Error fetching ERC721 token transfers:', data.message);
                erc721TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching ERC721 token transfers:', error);
        }

        // Fetch and display ERC1155 token transfers using Etherscan API
        try {
            const etherscanApiKey = '322HQ9G6UJS36H1VQ1BGSGUEF4URTRP1J4';
            const contractAddress = '0x76be3b62873462d2142405439777e971754e8e77';
            const etherscanApiUrl = `https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;
            const response = await fetch(etherscanApiUrl);
            const data = await response.json();
            if (data.status === '1') {
                const tokenTransfers = data.result;
                if (transactions.length === 0) {
                    erc1155TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
                } else {
                    tokenTransfers.forEach(transfer => {
                        const row = erc1155TokenTable.insertRow();
                        const tokenIdCell = row.insertCell();
                        const tokenContractCell = row.insertCell();
                        tokenIdCell.textContent = transfer.tokenID;
                        tokenContractCell.textContent = transfer.contractAddress;
                    });
                }

            } else {
                console.error('Error fetching ERC1155 token transfers:', data.message);
                erc1155TokenTable.innerHTML = '<tr><td colspan="2">No transactions</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching ERC1155 token transfers:', error);
        }
    }

    function showAlert(message) {
        alert(message);
    }

    updateUI();
});









//API KEY
// WMTGG9ZVVPARDUBDXPNKVAW35QZ383S4M4

//API KEY 2
// 322HQ9G6UJS36H1VQ1BGSGUEF4URTRP1J4

//API KEY 3
// F3F9UE7R37YCNTJCND18T25FTI5K2G3JGG
