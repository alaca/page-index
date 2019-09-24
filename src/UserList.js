import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer'

const UsersList = () => {

    const URI = new URLSearchParams(window.location.search);

    const [ state, setState ] = useState({
        isLoading: true,
        page:  URI.get('page') || 1,
        users: []
    });

 
    useEffect(() => {

        fetch('https://reqres.in/api/users?per_page=4&page=' + state.page  )
            .then(res => res.json())
            .then(json => {
                setState({ 
                    ...state, 
                    isLoading: false, 
                    users: state.users.concat(json.data) 
                })
            })
            .catch(err => console.log(err))

    }, [state.page])


    const renderUsers = user => {

        return (
            <div className="post" key={ user.id }>
                <Link to={`/user/${user.id}`}>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <img src={ user.avatar } alt={ user.first_name } />
                </Link>
            </div>
        )

    }

    //console.log( state.users )
    
    return (
        <>
            <Helmet>
                <title>Infinite scroll test app</title>
                <meta name="description" content="Infinite scroll test app description - proof of concept" /> 
            </Helmet>

            <h1>Users</h1>

            { state.users.map(user => renderUsers(user))}

            <br />

            <InView as="div" onChange={(inView, entry) => {
                if (inView && state.users.length > 0 ) setState({ ...state, page: parseInt(state.page) + 1 })
                }}>
                <a href={`?page=${ parseInt(state.page) + 1 }`} className="link" id="load-more">Load more</a>
            </InView>

        </>
    )

}

export default UsersList