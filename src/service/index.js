import axios from 'axios'

const baseUrl = "https://halloffame-server.herokuapp.com"

export const login = (username, password) => {
    var bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);

    return axios({
        method: 'post',
        url: `${baseUrl}/login`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(response=>{
        return response
    })
}

export const getfames = page => {
    return axios({
        method: 'get',
        url: `${baseUrl}/fames`,
        params: {page,},
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authorization")}`
        }
    })
    .then(response=> response.data)
}

export const getfame = id => {
    return axios({
        method: 'get',
        url: `${baseUrl}/fames/${id}`,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authorization")}`
        }
    })
    .then(response=> response.data)
}

export const logout = () => {
    return axios({
        method: 'get',
        url: `${baseUrl}/logout`,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authorization")}`
        }
    })
}