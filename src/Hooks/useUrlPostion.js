import { useSearchParams } from 'react-router-dom'

export function useUrlPosition() {
  let [searchparams] = useSearchParams()
  let lat = searchparams.get('lat')
  let lng = searchparams.get('lng')
  return [lat, lng]
}
