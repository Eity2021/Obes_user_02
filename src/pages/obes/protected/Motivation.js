import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import Motivation from '../../../ProjectFeatures/settings/motivation'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Team Members"}))
      }, [])


    return(
        <Motivation/>
    )
}

export default InternalPage