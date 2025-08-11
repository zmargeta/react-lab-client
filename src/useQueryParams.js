import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const useQueryParams = (config = []) => {
  const [params, setParams] = useSearchParams()

  const result = useMemo(
    () =>
      config.flatMap((it) => {
        const { name, fallback, converter = {}, deps = [], predicate = () => true, unset } = it

        const value = (name) => converter.inverse?.convert?.(params.get(name)) ?? params.get(name)

        const valueOrFallback = (name) => value(name) ?? fallback

        const applyDepsOrFallback = (name, deps) =>
          predicate(deps.map((item) => value(item))) ? valueOrFallback(name) : fallback

        return [
          deps.length > 0 ? applyDepsOrFallback(name, deps) : valueOrFallback(name),
          (value) => {
            setParams((urlParams) => {
              value && value !== fallback
                ? urlParams.set(name, converter.convert?.(value) ?? value)
                : urlParams.delete(name)
              unset?.forEach((item) => urlParams.delete(item))
              return urlParams
            })
          },
        ]
      }),
    [params, setParams, config]
  )

  return [...result, params, setParams]
}

export default useQueryParams
