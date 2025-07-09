import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import Questions from '../../../ProjectFeatures/questions'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Question"}))
      }, [])
      
    return(
        <Questions />
    )
}

export default InternalPage