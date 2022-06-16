<template>
    <v-row justify="center" align="center">
        <v-col cols="12" class="px-5 py-5 d-flex flex-column" style="gap: 10px">
            <h1 v-if="$route.query.error == 401">
                No tienes permiso para esta página.
            </h1>
            <h1 v-else>
                Error Default
            </h1>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'auth'
}
</script>