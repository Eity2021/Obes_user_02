import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import DocVideos from '../../../ProjectFeatures/docVideos'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Doctor Videos"}))
      }, [])

    return(
        <DocVideos />
    )
}

export default InternalPage;