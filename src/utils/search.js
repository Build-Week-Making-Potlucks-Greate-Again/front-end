import axiosWithAuth from '../validation/AxiosAuthorization'

export const searchUsername = ( username ) => {
    return(
        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/auth/users`)
        .then(res => {
            
            // returns a user object
            const userObject = {...(res.data.filter(user => user.username === username)[0])}
            return userObject
        })
        .catch(err => {
            debugger
            console.log(err)
        })
    )
}

export const searchUserId = ( id ) => {
    return(
        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/auth/users`)
        .then(res => {
            // returns a user object
            const userObject = {...(res.data.filter(user => user.id === id)[0])}
            return userObject
        })
        .catch(err => {
            debugger
            console.log(err)
        })
    )
}

// functions return a promise
    // // allows search of user, returns a promise of the user object
    // searchUsername('tester1')
    // .then(res => console.log(res))

    // searchUserId(1)
    // .then(res => console.log(res))