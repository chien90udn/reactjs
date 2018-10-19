// If user like at Token
export const getTokenForLike = 5;

// Api tetnest using web3
export const serverApi = "http://54.95.196.101:8545";

// Api export private key from address
export const apiExportPrivateKey = "http://54.95.196.101/projects/ApiPhp/index.php";

// account admin
export const accountAdmin = {
    privateKey      : "c6fbe1bc141bd504c1c2fc81601e71eef136a6756889a64640bf3cdfc621416e",
    address    		: '0x437aeffa148fc863977ce904ed666179a8760590',
    passPhasre    	: 'chien123456'
};

//
export const addressContract = "0x8e3ee419aece76bdb32b3281cc6322a5f2765007"; // Address contract

export const typeProduct = {
    sell_eth        : 1,
    donate_token    : 2
};

export const listProduct = [ 
    {
        id          : "01", 
        name        : "Iphone 6", 
        avatar      : "img.jpeg",
        price       : 300,  // ETH
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
        price       : 350,  // ETH
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
        price       : 400,  // ETH
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
        price       : 450,  // USD
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
        price       : 500,  // ETH
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
        price       : 600,  // ETH
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
        price       : 900,  // ETH
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
        price       : 1000,  // USD
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
        price       : 1000,  // ETH
        token       : 100,  // Token
        donate      : 10,   // using Token
        like        : [],     // If user like at Token
        flag_type   : typeProduct.donate_token,
        qrcode      : "", 
    },
    
];