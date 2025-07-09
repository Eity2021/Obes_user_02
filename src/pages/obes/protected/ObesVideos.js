import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import Videos from '../../../ProjectFeatures/videos'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Videos"}))
      }, [])

    return(
        <Videos />
    )
}

export default InternalPage;