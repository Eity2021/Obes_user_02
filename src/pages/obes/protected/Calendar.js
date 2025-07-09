import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import Calendar from '../../../ProjectFeatures/calendar'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Calendar"}))
      }, [])


    return(
        <Calendar />
    )
}

export default InternalPage