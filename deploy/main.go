package main

import (
	"fmt"
	"os"

	depl "github.com/digisan/deploy-util"
	nt "github.com/digisan/gotk/net-tool"
)

func main() {

	argsWithoutProg := os.Args[1:]

	old := "127.0.0.1"
	var new string
	if len(argsWithoutProg) > 0 {
		switch argsWithoutProg[0] {
		case "pub", "public":
			new = nt.PublicIP()
		case "loc", "local":
			new = nt.LocalIP()
		default:
			fmt.Println("unknown arg, ignore")
			return
		}
	} else {
		fmt.Println("missing arg [pub OR loc], ignore")
		return
	}

	fPath := "../src/share/ip.ts"
	ie, err := depl.EditOriginIP(old, new, "", -1, true, true, false, "original", "bak", fPath)
	if err != nil {
		fmt.Println(ie, err)
	}
	fmt.Printf("%v is modified\n", fPath)
}
