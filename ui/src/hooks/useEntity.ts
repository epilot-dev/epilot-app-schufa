import { useQuery } from "@tanstack/react-query"
import { getEntity } from "../api/entity"
import { useAppBridgeContext } from "../AppBridgeContext"

export const useEntity = (params: { id: string, slug: string }) => {
    const { token } = useAppBridgeContext()

    return useQuery({
        queryKey: ['entity', params.slug, params.id],
        queryFn: () => getEntity({ id: params.id, slug: params.slug, token }),
        enabled: !!params.id && !!params.slug && !!token,
    })
}