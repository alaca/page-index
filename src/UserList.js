import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer'

const UsersList = () => {

    const per_page = 2

    const URI = new URLSearchParams(window.location.search);

    const [ state, setState ] = useState({
        hasMore: true,
        isLoading: true,
        page:  URI.get('page') || 1,
        users: []
    });

 
    useEffect(() => {

        const controller = new AbortController()

        fetch('https://reqres.in/api/users?per_page=' + per_page + '&page=' + state.page, { signal : controller.signal })
        .then(res => res.json())
        .then(json => {
            setState({ 
                ...state, 
                hasMore: (json.total > ( state.page * per_page ) ),
                isLoading: false, 
                users: state.users.concat(json.data) 
            })
        })
        .catch(err => console.log(err))

        return function cleanup() {
            controller.abort()
        }

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

    if ( state.isLoading ) {
        return <h1>Loading....</h1>
    }

    
    return (
        <>
            <Helmet>
                <title>Infinite scroll test app</title>
                <meta name="description" content="Infinite scroll test app description - proof of concept" /> 
            </Helmet>

            <h1>Users</h1>

            { state.users.map(user => renderUsers(user)) }

            <br />

            { state.hasMore && (

                <InView as="div" onChange={ inView => {

                    if ( inView ) {

                        setTimeout(() => {
                            setState({ 
                                ...state, 
                                page: parseInt(state.page) + 1 
                            })
                        }, 1000)
                    }
                    
                    }}>

                    <a href={`?page=${ parseInt(state.page) + 1 }`} className="link">
                        Load more
                    </a>

                </InView>

            )}

        </>
    )

}

export default UsersList