import store from '../store'

const simpleLogin = user => ({ type: LOGIN, user })

const asyncLogin = () =>
  axios.get('/api/auth/me')
  .then(res => res.data)
  .then(user => {
    store.dispatch(simpleLogin(user))
  })

// somewhere in component:
asyncLogin()

// in an action creator module:
const simpleLogin = user => ({ type: LOGIN, user })

// Look, no store import!

const thunkedLogin = () =>     // action creator, when invoked…
  dispatch =>                  // …returns thunk; when invoked with `dispatch`…
    axios.get('/api/auth/me')  // …performs the actual effect.
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })

// somewhere in component:
store.dispatch(thunkedLogin()) // dispatches the thunk to the store.

// The thunk itself (`dispatch => axios.get…`) has not yet been called.
// When it reaches the middleware, `redux-thunk` will intercept & invoke it,
// passing in the store's `dispatch`