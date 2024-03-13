import './App.css';

function App() {

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        document.getElementById('connectButton').innerHTML = "Connected";

        const permissions = await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });

        if (permissions.some(permission => permission.parentCapability === 'eth_accounts')) {
          console.log('Permission accordée pour accéder aux comptes.');
        } else {
          console.log('Permission non accordée pour accéder aux comptes.');
        }

      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        document.getElementById('connectButton').innerHTML = "Connection Failed";
      }
    } else {
      document.getElementById('connectButton').innerHTML = "Please install MetaMask";
    }
  }

  async function sendTransaction() {
    const transactionParameters = {
      nonce: '0x00', // Ignoré par MetaMask
      to: '0x18D5687B7d8718b58206Fb5B504F0B6Ae41513EC', // Adresse du destinataire
      from: ethereum.selectedAddress, // Doit correspondre au compte retourné par eth_accounts
      value: '0xMontant', // Montant en wei
      gasPrice: '0x09184e72a000', // Personnalisé par l'utilisateur lors de la transaction
      gas: '0x2710', // Limite de gas
    };
  
    try {
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      console.log('Transaction Hash:', txHash);
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  }

  return (
    <>
      <button id='connectButton' onClick={connect}>Connect</button>
      <button id='sendTransaction' onClick={sendTransaction}>Send Transaction</button>
    </>
  );
}

export default App;
