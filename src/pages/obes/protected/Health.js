import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import Health from '../../../ProjectFeatures/health'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Heath Reviews"}))
      }, [])


    return(
        <Health />
    )
}

export default InternalPage