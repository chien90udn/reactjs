// If user like at Token
export const getTokenForLike = 5;

// Api tetnest using web3
export const serverApi = "http://54.95.196.101:8545";

// Api export private key from address
export const apiExportPrivateKey = "http://54.95.196.101/projects/ApiPhp/index.php";

// account admin
export const accountAdmin = {
    privateKey      : "c6fbe1bc141bd504c1c2fc81601e71eef136a6756889a64640bf3cdfc621416e",
    address    		: '0x1b1321ff4df14d41caaed7189762b1c8f49452de',
    passPhasre    	: 'chien12d@'
};

//
export const addressContract = "0x43e18398b3b90e10642053b47b70c6a3491f3b55"; // Address contract

export const typeProduct = {
    sell_eth        : 1,
    donate_token    : 2
};

export const listProduct = [ 
    {
        id          : "01", 
        name        : "Iphone 6", 
        avatar      : "img.jpeg",
        price       : 1,  // ETH
        token       : 10,  // Token
        donate      : 2,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "02", 
        name        : "Iphone 6S", 
        avatar      : "img.jpeg",
        price       : 2,  // ETH
        token       : 10,  // Token
        donate      : 2,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "03", 
        name        : "Iphone 6 Plus", 
        avatar      : "img.jpeg",
        price       : 2,  // ETH
        token       : 10,  // Token
        donate      : 3,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "04", 
        name        : "Iphone 7", 
        avatar      : "img.jpeg",
        price       : 1,  // USD
        token       : 10,  // USD
        donate      : 4,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "05", 
        name        : "Iphone 7 Plus", 
        avatar      : "img.jpeg",
        price       : 3,  // ETH
        token       : 15,  // Token
        donate      : 5,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "06", 
        name        : "Iphone 8", 
        avatar      : "img.jpeg",
        price       : 4,  // ETH
        token       : 10,  // Toen
        donate      : 6,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "07", 
        name        : "Iphone X", 
        avatar      : "img.jpeg",
        price       : 1,  // ETH
        token       : 10,  // Token
        donate      : 2,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.sell_eth,
        qrcode      : "", 
    },
    {
        id          : "08", 
        name        : "Iphone XS", 
        avatar      : "img.jpeg",
        price       : 1,  // USD
        token       : 100,  // USD
        donate      : 10,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.donate_token,
        qrcode      : "", 
    },
    {
        id          : "09", 
        name        : "Iphone XMax", 
        avatar      : "img.jpeg",
        price       : 1,  // ETH
        token       : 100,  // Token
        donate      : 10,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.donate_token,
        qrcode      : "", 
    },
    
];