import axios from "axios";

export const checkAuth = async () => {
    // axios.defaults.withCredentials = true
    try {
        const response = await axios.post('https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
            "grant_type=refresh_token", {
                crossDomain: true
            })
        // const response = await axios.post('https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
        //     "grant_type=password&username=scott&password=tiger")
        // console.log(document.cookie === '')
        // if(document.cookie === ''){
        //     document.cookie=`refresh_token=${response.data.access_token}; samesite=none`
        // }
        console.log(response)
        // console.log(document.cookie)

        // setTimeout(async ()=>{
        //     const response2 = await axios.post('https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
        //         "grant_type=refresh_token")
        //
        //     console.log(response2)
        // },4000)
        // console.log(document.cookie)
    } catch (e) {
        console.log(e.response);
    }

}