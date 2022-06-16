export default ({ store, route, redirect, $auth, error }) => {
    if ($auth.$state.user) {
        const rolesOnRoute = route.meta.map((meta) => {
            if (meta.auth && typeof meta.auth.role !== 'undefined') return meta.auth.role
            return []
        })

        let r = []

        if(rolesOnRoute[0].length != 0){
            r = rolesOnRoute[0].map( function (element) {
                return store.$auth.$state.user.perfil.role.includes(element)
            });
        }

        if(r.includes(false)) redirect(`/error?error=${401}`)
    }
}