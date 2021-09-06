$(document).ready(function () {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_wallet',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: '_id',
          type: 'string',
        },
      ],
      name: 'SM_send_data',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_id',
          type: 'string',
        },
      ],
      name: 'register',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'userArr',
      outputs: [
        {
          internalType: 'string',
          name: '_id',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '_wallet',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const addressSM = '0xa25E20cf451Ff4050eb859615440d99185Cb3bff';

  const web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  var contract_MM = new web3.eth.Contract(abi, addressSM);

  // create contract for infura
  var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/2f1fb5d3eceb4eec967f94fbf2563eeb");
  var web3_infura = new Web3(provider);
  var contract_infura = new web3_infura.eth.Contract(abi, addressSM);
  // run check MM

  contract_infura.events.SM_send_data({ filter: {}, fromBlock: "latest" }, function (error, event) {
    if (error) {
      console.log(error);
    }
    if (event) {
      console.log(event.returnValues);
      $('#tableBody').append(`
        <td>${event.returnValues._wallet}</td>
        <td>${event.returnValues._id}</td>
      `)
    }
  })
  myStorage = window.localStorage;
  checkMM();
  let currentAccount;
  $('#connectMM').click(function () {
    connectMetaMask()
      .then((data) => {
        currentAccount = data[0];
        localStorage.setItem('currentAccount', currentAccount);
      })
      .catch((error) => console.log(error));
  });

  $('#submit').click(function () {
    const currentAccount = localStorage.getItem('currentAccount');
    if (!currentAccount) {
      alert('Please connect metaMask');
      return;
    }
    $.post('/users/register', {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
    })
      .done(function (data) {
        console.log(data.user._id);
        contract_MM.methods.register(data?.user._id).send({
          from: currentAccount // sender
        })
      })
      .fail(function (error) {
        alert(error.responseJSON.message);
      });
  });
});

function checkMM() {
  if (typeof window.ethereum !== 'undefined') {
    alert('metaMask has been installed');
  } else alert('metaMask has not been installed');
}

async function connectMetaMask() {
  return ethereum.request({ method: 'eth_requestAccounts' });
}
