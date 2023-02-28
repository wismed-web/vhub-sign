const IP = "127.0.0.1"

// modify '/etc/hosts' if dev & debug at local
export const Domain = "v-hub.net"
export const IP_API = `http://api.${Domain}/`;    // "127.0.0.1:1323"
export const IP_SIGN = `http://${Domain}/`;       // "127.0.0.1:8080"
export const IP_MAIN = `http://main.${Domain}/`;  // "127.0.0.1:8081"
export const IP_CMS = `http://cms.${Domain}/`;    // "127.0.0.1:8082"