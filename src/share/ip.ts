const IP = "127.0.0.1"
export const Domain = "v-hub.net" // '.net' for aws cloud product; '.link' for aws cloud test; '.test' for local test

// modify '/etc/hosts' if dev & debug at local
export const URL_API = `http://api.${Domain}`;    // "127.0.0.1:1323"
export const URL_SIGN = `http://${Domain}`;       // "127.0.0.1:8080"
export const URL_MAIN = `http://main.${Domain}`;  // "127.0.0.1:8081"
export const URL_CMS = `http://cms.${Domain}`;    // "127.0.0.1:8082"