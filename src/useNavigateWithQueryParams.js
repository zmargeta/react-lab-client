import { useNavigate } from 'react-router-dom'
import useQueryParams from './useQueryParams.js'

const useNavigateWithQueryParams = (queryParams = []) => {
  const navigate = useNavigate()
  const [searchParams] = useQueryParams()

  const toParams =
    queryParams.length > 0
      ? queryParams.reduce((urlParams, urlParam) => {
          const paramValue = searchParams.get(urlParam)
          paramValue ? urlParams.set(urlParam, paramValue) : urlParams.delete(urlParam)
          return urlParams
        }, new URLSearchParams())
      : searchParams

  const mergeWithToParams = (search) => {
    const mergedParams = new URLSearchParams(search)
    toParams.forEach((value, key) => {
      mergedParams.set(key, value)
    })
    return mergedParams.size > 0 ? `?${mergedParams}` : ''
  }

  return (to, options) => {
    if (typeof to === 'number') {
      return navigate(to, options)
    }

    if (typeof to === 'object') {
      to.search = mergeWithToParams(to.search)
      return navigate(to, options)
    }

    const [toHost, toSearch] = to.split('?')
    return navigate(`${toHost}${mergeWithToParams(toSearch)}`, options)
  }
}

export default useNavigateWithQueryParams
