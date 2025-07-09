import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import StepsOfSeven from '../../../ProjectFeatures/steps'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "StepsOfSeven"}))
      }, [])


    return(
        <StepsOfSeven />
    )
}

export default InternalPage