export default ({ store, redirect, $auth }) => {
    if ($auth.$state.user) {
        redirect('/')
    }
}