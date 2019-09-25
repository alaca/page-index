import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet'

const UserProfile = ({ match }) => {

    const [state, setState] = useState({
        isLoading: true,
        user: null
    })

    useEffect(() => {

        const controller = new AbortController()

        fetch('https://reqres.in/api/users/' + match.params.id, { signal: controller.signal })
            .then(res => res.json())
            .then(json => setState({ isLoading: false, user: json.data }))
            .catch(err => console.log(err))

        return () => {
            controller.abort()
        }

    }, [match.params.id])


    if (state.isLoading) {
        return <h1>Loading....</h1>
    }

    const { avatar, first_name, last_name, email } = state.user

    return (
        <>
            <Helmet>
                <title>{`${first_name} ${last_name} - Profile`}</title>
                <meta name="description" content={`Info about ${first_name} ${last_name}`} />
            </Helmet>

            <h2>{first_name} {last_name}</h2>
            <img src={avatar} alt={first_name} />
            <p>{email}</p>
        </>
    )

}

export default UserProfile